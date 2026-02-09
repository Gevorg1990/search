/**
 * Search Pro Configuration
 * Generated on 2/9/2026, 10:34:23 AM
 * This file can be directly included in your project.
 */

window.searchProConfig = {
  "autoHide": {
    "mobile": false,
    "desktop": false
  },
  "mobileBreakpoint": 768,
  "minSearchChars": 2,
  "minSearchLength": 2,
  "elementTriggering": {
    "initialDelay": 300,
    "maxRetries": 3,
    "retryInterval": 300,
    "maxRetryInterval": 1000,
    "baseRetryInterval": 300
  },
  "filter": {
    "mode": "none",
    "allowedValues": [],
    "blacklistedValues": [],
    "valueMatchMode": {
      "whitelist": "exact",
      "blacklist": "contains"
    },
    "mediaIndexes": {
      "mode": "none",
      "allowed": [],
      "blacklisted": []
    },
    "elementTypes": {
      "mode": "none",
      "allowedTypes": [],
      "blacklistedTypes": []
    },
    "elementLabels": {
      "mode": "none",
      "allowedValues": [],
      "blacklistedValues": []
    },
    "tagFiltering": {
      "mode": "none",
      "allowedTags": [],
      "blacklistedTags": []
    }
  },
  "searchSettings": {
    "debounce": 300,
    "maxResults": 50,
    "caseSensitive": false,
    "fuzzySearch": {
      "enabled": false,
      "threshold": 0.3
    },
    "highlightMatches": true,
    "fieldWeights": {
      "label": 1,
      "businessName": 0.9,
      "subtitle": 0.8,
      "businessTag": 1,
      "tags": 0.6,
      "parentLabel": 0.3
    },
    "behavior": {
      "threshold": 0.4,
      "distance": 40,
      "minMatchCharLength": 1,
      "useExtendedSearch": true,
      "ignoreLocation": true,
      "includeScore": true
    },
    "boostValues": {
      "businessMatch": 2,
      "sheetsMatch": 2.5,
      "labeledItem": 1.5,
      "unlabeledItem": 1,
      "childElement": 0.8
    }
  },
  "displayLabels": {
    "Panorama": "Panorama",
    "Hotspot": "Hotspot",
    "Polygon": "Polygon",
    "Video": "Video",
    "Webframe": "Webframe",
    "Image": "Image",
    "Text": "Text",
    "ProjectedImage": "Projected Image",
    "Element": "Element",
    "Business": "Business",
    "3DHotspot": "3D Hotspot",
    "3DModel": "3D Model",
    "3DModelObject": "3D Model Object",
    "Container": "Container"
  },
  "useAsLabel": {
    "subtitles": true,
    "tags": true,
    "elementType": false,
    "parentWithType": false,
    "customText": "[Unnamed Item]"
  },
  "maxResults": 20,
  "debugMode": false,
  "showHotspots": true,
  "showMedia": true,
  "showPanoramas": true,
  "searchInHotspotTitles": true,
  "searchInMediaTitles": true,
  "searchInPanoramaTitles": true,
  "searchInHotspotDescriptions": false,
  "searchInMediaDescriptions": false,
  "searchBar": {
    "placeholder": "Search... Type * for all",
    "width": 350,
    "position": {
      "top": 70,
      "right": 70,
      "left": null,
      "bottom": null
    },
    "useResponsive": true,
    "mobilePosition": {
      "top": 60,
      "left": 20,
      "right": 20,
      "bottom": "auto"
    },
    "mobileOverrides": {
      "enabled": true,
      "breakpoint": 768,
      "width": "90%",
      "maxWidth": 350,
      "visibility": {
        "behavior": "dynamic",
        "showOnScroll": true,
        "hideThreshold": 100
      }
    }
  },
  "appearance": {
    "searchField": {
      "borderRadius": {
        "topLeft": 35,
        "topRight": 35,
        "bottomRight": 35,
        "bottomLeft": 35
      },
      "typography": {
        "fontSize": "16px",
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        "fontWeight": "400",
        "fontStyle": "normal",
        "lineHeight": "1.5",
        "letterSpacing": "0px",
        "textTransform": "none",
        "placeholder": {
          "fontSize": "16px",
          "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
          "fontWeight": "400",
          "fontStyle": "italic",
          "opacity": 0.7,
          "letterSpacing": "0px",
          "textTransform": "none"
        },
        "focus": {
          "fontSize": "16px",
          "fontWeight": "400",
          "letterSpacing": "0.25px"
        }
      }
    },
    "searchResults": {
      "borderRadius": {
        "topLeft": 5,
        "topRight": 5,
        "bottomRight": 5,
        "bottomLeft": 5
      }
    },
    "colors": {
      "searchBackground": "#f4f3f2",
      "searchText": "#1a1a1a",
      "placeholderText": "#94a3b8",
      "searchIcon": "#94a3b8",
      "clearIcon": "#94a3b8",
      "resultsBackground": "#ffffff",
      "groupHeaderBackground": "#ffffff",
      "groupHeaderColor": "#20293A",
      "groupCountColor": "#94a3b8",
      "resultHover": "#f0f0f0",
      "resultBorderLeft": "#ebebeb",
      "resultText": "#1e293b",
      "resultSubtitle": "#64748b",
      "resultIconColor": "#6e85f7",
      "resultSubtextColor": "#000000",
      "tagBackground": "#e0f2fe",
      "tagText": "#0369a1",
      "tagBorder": "#0891b2",
      "highlightBackground": "#ffff00",
      "highlightBackgroundOpacity": 0.5,
      "highlightText": "#000000",
      "highlightWeight": "bold"
    },
    "tags": {
      "borderRadius": 16,
      "fontSize": "11px",
      "padding": "3px 10px",
      "margin": "2px",
      "fontWeight": "600",
      "textTransform": "uppercase",
      "showBorder": true,
      "borderWidth": "1px"
    }
  },
  "display": {
    "showGroupHeaders": true,
    "showGroupCount": true,
    "showIconsInResults": true,
    "showTagsInResults": true,
    "showSubtitlesInResults": true,
    "showParentInfo": true
  },
  "thumbnailSettings": {
    "enableThumbnails": false,
    "thumbnailSize": "48px",
    "borderRadius": 4,
    "borderWidth": 4,
    "borderColor": "#9CBBFF",
    "defaultImagePath": "assets/default-thumbnail.jpg",
    "defaultImages": {
      "Panorama": "assets/default-thumbnail.jpg",
      "Hotspot": "assets/hotspot-default.jpg",
      "Polygon": "assets/polygon-default.jpg",
      "Video": "assets/video-default.jpg",
      "Webframe": "assets/webframe-default.jpg",
      "Image": "assets/image-default.jpg",
      "Text": "assets/text-default.jpg",
      "ProjectedImage": "assets/projected-image-default.jpg",
      "Element": "assets/element-default.jpg",
      "Business": "assets/business-default.jpg",
      "3DModel": "assets/3d-model-default.jpg",
      "3DHotspot": "assets/3d-hotspot-default.jpg",
      "3DModelObject": "assets/3d-model-object-default.jpg",
      "default": "assets/default-thumbnail.jpg"
    },
    "groupHeaderAlignment": "left",
    "groupHeaderPosition": "top",
    "iconSettings": {
      "enableCustomIcons": false,
      "enableFontAwesome": false,
      "fontAwesomeUrl": "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      "iconSize": "24px",
      "iconColor": "#3b82f6",
      "iconOpacity": 0.9,
      "iconAlignment": "left",
      "iconMargin": 12,
      "iconBorderRadius": 6,
      "enableIconHover": true,
      "iconHoverScale": 1.15,
      "iconHoverOpacity": 1,
      "customIcons": {
        "Panorama": "fas fa-home",
        "Hotspot": "fas fa-laptop",
        "Polygon": "fas fa-diamond",
        "Video": "fas fa-video",
        "Webframe": "fas fa-laptop",
        "Image": "fas fa-image",
        "Text": "fas fa-file-alt",
        "ProjectedImage": "fas fa-desktop",
        "Element": "fas fa-circle",
        "Business": "fas fa-building",
        "3DHotspot": "fas fa-gamepad",
        "Container": "fas fa-window-restore",
        "3DModel": "fas fa-cube",
        "3DModelObject": "fas fa-wrench",
        "default": "fas fa-circle"
      },
      "showIconFor": {
        "panorama": true,
        "hotspot": true,
        "polygon": true,
        "video": true,
        "webframe": true,
        "image": true,
        "text": true,
        "projectedImage": true,
        "element": true,
        "business": true,
        "3dmodel": true,
        "3dhotspot": true,
        "3dmodelobject": true,
        "container": true,
        "other": true
      },
      "fallbackSettings": {
        "useDefaultOnError": true,
        "hideIconOnError": false,
        "showTypeLabel": false
      }
    }
  },
  "includeContent": {
    "containerSearch": {
      "enableContainerSearch": true,
      "containerNames": []
    },
    "elements": {
      "includePanoramas": true,
      "includeHotspots": true,
      "includePolygons": true,
      "includeVideos": true,
      "includeWebframes": true,
      "includeImages": true,
      "includeText": true,
      "includeProjectedImages": true,
      "includeElements": true,
      "includeBusiness": true,
      "include3DModels": true,
      "include3DHotspots": true,
      "include3DModelObjects": true,
      "includeContainers": true
    },
    "searchableProperties": {
      "title": true,
      "description": true,
      "subtitle": true,
      "tags": true,
      "customProperties": []
    }
  },
  "businessData": {
    "useBusinessData": false,
    "replaceTourData": false,
    "includeStandaloneEntries": false,
    "businessDataFile": "business.json",
    "businessDataDir": "business-data",
    "matchField": "id",
    "businessDataUrl": "https://pxl360.com/search-plugin/search-pro-v3/dashboard/search-pro-v3/business-data/business.json"
  },
  "googleSheets": {
    "useGoogleSheetData": false,
    "includeStandaloneEntries": false,
    "useAsDataSource": false,
    "fetchMode": "csv",
    "googleSheetUrl": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrQ9oy4JjwYAdTG1DKne9cu76PZCrZgtIOCX56sxVoBwRzys36mTqvFMvTE2TB-f-k5yZz_uWwW5Ou/pub?output=csv",
    "useLocalCSV": false,
    "localCSVFile": "search-data.csv",
    "localCSVDir": "business-data",
    "localCSVUrl": "https://pxl360.com/search-plugin/search-pro-v3/dashboard/search-pro-v3/business-data/search-data.csv",
    "csvOptions": {
      "header": true,
      "skipEmptyLines": true,
      "dynamicTyping": true
    },
    "caching": {
      "enabled": false,
      "timeoutMinutes": 60,
      "storageKey": "tourGoogleSheetsData"
    },
    "animations": {
      "enabled": false,
      "duration": {
        "fast": 150,
        "normal": 250,
        "slow": 400
      },
      "easing": "ease-out",
      "searchBar": {
        "openDuration": 300,
        "closeDuration": 200,
        "scaleEffect": true
      },
      "results": {
        "fadeInDuration": 200,
        "slideDistance": 8,
        "staggerDelay": 30
      },
      "reducedMotion": {
        "respectPreference": true,
        "fallbackDuration": 80
      }
    }
  },
  "thumbnails": {
    "defaults": {
      "other": "assets/default-thumbnail.jpg"
    }
  },
  "animations": {
    "duration": {
      "fast": 200,
      "normal": 300,
      "slow": 500
    },
    "easing": "cubic-bezier(0.22, 1, 0.36, 1)",
    "searchBar": {
      "openDuration": 300,
      "closeDuration": 200,
      "scaleEffect": true
    },
    "results": {
      "fadeInDuration": 200,
      "slideDistance": 10,
      "staggerDelay": 50
    },
    "reducedMotion": {
      "respectPreference": true,
      "fallbackDuration": 100
    },
    "enabled": false
  },
  "showTagsInResults": true
};

// Auto-apply if searchFunctions is ready (silent)
(function(){try{if(window.searchFunctions&&window.searchFunctions.updateConfig){window.searchFunctions.updateConfig(window.searchProConfig);}}catch(e){}})();
if (typeof module !== 'undefined' && module.exports) { module.exports = window.searchProConfig; }
