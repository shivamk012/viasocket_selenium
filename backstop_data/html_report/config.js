report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\my_project_Login_0_document_0_desktop.png",
        "test": "..\\bitmaps_test\\20230929-114704\\my_project_Login_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "my_project_Login_0_document_0_desktop.png",
        "label": "Login",
        "misMatchThreshold": 0.1,
        "url": "https://flow.viasocket.com/",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0,
          "misMatchPercentage": "0.00",
          "analysisTime": 26
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\my_project_Create_Org_0_document_0_desktop.png",
        "test": "..\\bitmaps_test\\20230929-114704\\my_project_Create_Org_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "my_project_Create_Org_0_document_0_desktop.png",
        "label": "Create Org",
        "misMatchThreshold": 0.1,
        "url": "https://flow.viasocket.com/",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0.14429012345679013,
          "misMatchPercentage": "0.14",
          "analysisTime": 44
        },
        "diffImage": "..\\bitmaps_test\\20230929-114704\\failed_diff_my_project_Create_Org_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "my_project"
});