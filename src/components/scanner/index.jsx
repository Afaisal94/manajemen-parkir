import React, { useEffect, useState } from "react";
import Quagga from "quagga";

function Scanner(props) {
  useEffect(() => {    
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 320,
            facingMode: "environment",
          },
          //   area: { // defines rectangle of the detection/localization area
          //     top: "10%",    // top offset
          //     right: "10%",  // right offset
          //     left: "10%",   // left offset
          //     bottom: "10%"  // bottom offset
          //   },
        },
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
        numOfWorkers: 4,
        decoder: {
          readers: ["code_128_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    // Quagga.onDetected(_onDetected);
    Quagga.onDetected(function(result) {
      console.log("Barcode detected and read : " + result.codeResult.code);
      props.onDetected(result);
      Quagga.stop(); // stop after getting a result
  });
    

  }, []);

  const _onDetected = (result) => {
    props.onDetected(result);
    // console.log(result);
  };

  return <div id="interactive" className="viewport" />;
}

export default Scanner;
