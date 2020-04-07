function loadJSON() {
            console.log(">>>>> Clearing Local Storage");
            localStorage.clear();
            console.log(">>>>> Starting to load Brand Profile from brandprofile.json");
            //brand section
            $.getJSON('./json/brandprofile.json', function(json) {

                //*********************************************
                //Store Brand Profile Settings in Local Storage
                //*********************************************
                localStorage.setItem('brandname', json.brand.name);
                localStorage.setItem('brandldap', json.brand.ldap);
                localStorage.setItem('brandindustry', json.brand.industry);
                localStorage.setItem('brandusecallcenter', json.brand.useCallCenter);
                localStorage.setItem('brandusepersonalshopper', json.brand.usePersonalShopper);
                localStorage.setItem('brandindustry', json.brand.industry);
                localStorage.setItem('demosetuptype', json.brand.demosetuptype);
                localStorage.setItem('brandcurrency', json.brand.currency);

                //*********************************************
                //Store X-ray Panel Settings in Local Storage
                //*********************************************
                localStorage.setItem('brandUseAAM', json.brand.useAAM);
                localStorage.setItem('brandUseAA', json.brand.useAA);
                localStorage.setItem('brandUseAT', json.brand.useAT);
                localStorage.setItem('brandUseAC', json.brand.useAC);
                localStorage.setItem('brandUseMKT', json.brand.useMKT);
                localStorage.setItem('brandUsePlatform', json.brand.brandUsePlatform);

                //***********************************************************
                //Store Configuration Mode - Domain Settings in Local Storage
                //***********************************************************
                localStorage.setItem('brandconfighostname', json.brand.confighostname);
                localStorage.setItem('brandconfigportnumber', json.brand.configportnumber);
                
                //***********************************************************
                //Store Publication Mode - Domain Settings in Local Storage
                //***********************************************************
                localStorage.setItem('brandpublishlocation', json.brand.publishLocation);
                localStorage.setItem('brandpublishusecustomport', json.brand.publishUseCustomPort);

                //***********************************************************
                //Store Marketo API Settings in Local Storage
                //***********************************************************
                localStorage.setItem('mktEndpoint', json.marketo.mktEndpoint);
                localStorage.setItem('mktClientId', json.marketo.mktClientId);
                localStorage.setItem('mktClientSecret', json.marketo.mktClientSecret);
                localStorage.setItem('mktFields', json.marketo.mktFields);
                
                //******************************************
                //Determine Config Mode vs Publish Mode
                //******************************************
                var thisProtocol = window.location.protocol;
                var thisHostName = window.location.hostname;
                var thisPortNumber = window.location.port;

                var pathArray = window.location.pathname.split('/');
                var thisPath = pathArray[1];

                var imagebaseurl = "";
                
                if(thisPortNumber !== ""){
                    if(thisPath !== ""){
                        imagebaseurl = thisProtocol + '//' + thisHostName + ':' + thisPortNumber + '/' + thisPath + '/images/';
                    }else{
                        imagebaseurl = thisProtocol + '//' + thisHostName + ':' + thisPortNumber + '/images/';
                    }
                }else{
                    if(thisPath !== ""){
                        imagebaseurl = thisProtocol + '//' + thisHostName + '/' + thisPath + '/images/';
                    }else{
                        imagebaseurl = thisProtocol + '//' + thisHostName + '/images/';
                    }
                }

                localStorage.setItem('imagebaseurl', imagebaseurl);
                console.log(">>>>> Defined Image Base URL: " + imagebaseurl);

                //*********************************************
                //Store Brand Image Settings in Local Storage
                //*********************************************
                if(json.brand.locallogo){
                    localStorage.setItem('brandlogo', imagebaseurl + json.brand.logo);
                }else{
                    localStorage.setItem('brandlogo', json.brand.logo);
                }
                
                if(json.brand.localfavicon){
                    localStorage.setItem('faviconlink', imagebaseurl + json.brand.favicon);
                }else{
                    localStorage.setItem('faviconlink', json.brand.favicon);
                }
                
                if(json.brand.localhero){
                    localStorage.setItem('brandhero', imagebaseurl + json.brand.hero);
                }else{
                    localStorage.setItem('brandhero', json.brand.hero);
                }

                localStorage.setItem('brandcalltoaction', json.brand.calltoaction);
                localStorage.setItem('brandcalltoactionurl', json.brand.calltoactionurl);
                
                //*********************************************
                //Store Brand Page Settings in Local Storage
                //*********************************************
                localStorage.setItem('page0title', json.pages.page0.title);
                localStorage.setItem('page0url', json.pages.page0.url);
                localStorage.setItem('page0heroimage', json.pages.page0.heroimage);
                localStorage.setItem('page0active', json.pages.page0.active);

                localStorage.setItem('page1title', json.pages.page1.title);
                localStorage.setItem('page1url', json.pages.page1.url);
                localStorage.setItem('page1heroimage', imagebaseurl + json.pages.page1.heroimage);
                localStorage.setItem('page1active', json.pages.page1.active);

                localStorage.setItem('page2title', json.pages.page2.title);
                localStorage.setItem('page2url', json.pages.page2.url);
                localStorage.setItem('page2heroimage', imagebaseurl + json.pages.page2.heroimage);
                localStorage.setItem('page2active', json.pages.page2.active);

                localStorage.setItem('page3title', json.pages.page3.title);
                localStorage.setItem('page3url', json.pages.page3.url);
                localStorage.setItem('page3heroimage', imagebaseurl + json.pages.page3.heroimage);
                localStorage.setItem('page3active', json.pages.page3.active);

                localStorage.setItem('page4title', json.pages.page4.title);
                localStorage.setItem('page4url', json.pages.page4.url);
                localStorage.setItem('page4heroimage', imagebaseurl + json.pages.page4.heroimage);
                localStorage.setItem('page4active', json.pages.page4.active);

                localStorage.setItem('page5title', json.pages.page5.title);
                localStorage.setItem('page5url', json.pages.page5.url);
                localStorage.setItem('page5heroimage', imagebaseurl + json.pages.page5.heroimage);
                localStorage.setItem('page5active', json.pages.page5.active);

                localStorage.setItem('page6title', json.pages.page6.title);
                localStorage.setItem('page6url', json.pages.page6.url);
                localStorage.setItem('page6heroimage', json.pages.page6.heroimage);
                localStorage.setItem('page6active', json.pages.page6.active);

                localStorage.setItem('page7title', json.pages.page7.title);
                localStorage.setItem('page7url', json.pages.page7.url);
                localStorage.setItem('page7heroimage', json.pages.page7.heroimage);
                localStorage.setItem('page7active', json.pages.page7.active);

                localStorage.setItem('page8title', json.pages.page8.title);
                localStorage.setItem('page8url', json.pages.page8.url);
                localStorage.setItem('page8heroimage', json.pages.page8.heroimage);
                localStorage.setItem('page8active', json.pages.page8.active);

                localStorage.setItem('page9title', json.pages.page9.title);
                localStorage.setItem('page9url', json.pages.page9.url);
                localStorage.setItem('page9heroimage', json.pages.page9.heroimage);
                localStorage.setItem('page9active', json.pages.page9.active);

                //*********************************************
                //Store Brand Product Settings in Local Storage
                //*********************************************
                localStorage.setItem('product1active', json.products.product1.active);
                localStorage.setItem('product1name', json.products.product1.name);
                localStorage.setItem('product1description', json.products.product1.description);
                localStorage.setItem('product1category', json.products.product1.category);
                localStorage.setItem('product1price', json.products.product1.price);
                localStorage.setItem('product1url', json.products.product1.url);
                localStorage.setItem('product1image1', json.products.product1.image1);
                localStorage.setItem('product1image2', json.products.product1.image2);
                localStorage.setItem('product1eeimgurl', json.products.product1.EEimgurl);

                localStorage.setItem('product2active', json.products.product2.active);
                localStorage.setItem('product2name', json.products.product2.name);
                localStorage.setItem('product2description', json.products.product2.description);
                localStorage.setItem('product2category', json.products.product2.category);
                localStorage.setItem('product2price', json.products.product2.price);
                localStorage.setItem('product2url', json.products.product2.url);
                localStorage.setItem('product2image1', json.products.product2.image1);
                localStorage.setItem('product2image2', json.products.product2.image2);
                localStorage.setItem('product2eeimgurl', json.products.product2.EEimgurl);

                localStorage.setItem('product3active', json.products.product3.active);
                localStorage.setItem('product3name', json.products.product3.name);
                localStorage.setItem('product3description', json.products.product3.description);
                localStorage.setItem('product3category', json.products.product3.category);
                localStorage.setItem('product3price', json.products.product3.price);
                localStorage.setItem('product3url', json.products.product3.url);
                localStorage.setItem('product3image1', json.products.product3.image1);
                localStorage.setItem('product3image2', json.products.product3.image2);
                localStorage.setItem('product3eeimgurl', json.products.product3.EEimgurl);

                localStorage.setItem('product4active', json.products.product4.active);
                localStorage.setItem('product4name', json.products.product4.name);
                localStorage.setItem('product4description', json.products.product4.description);
                localStorage.setItem('product4category', json.products.product4.category);
                localStorage.setItem('product4price', json.products.product4.price);
                localStorage.setItem('product4url', json.products.product4.url);
                localStorage.setItem('product4image1', json.products.product4.image1);
                localStorage.setItem('product4image2', json.products.product4.image2);
                localStorage.setItem('product4eeimgurl', json.products.product4.EEimgurl);

                localStorage.setItem('product5active', json.products.product5.active);
                localStorage.setItem('product5name', json.products.product5.name);
                localStorage.setItem('product5description', json.products.product5.description);
                localStorage.setItem('product5category', json.products.product5.category);
                localStorage.setItem('product5price', json.products.product5.price);
                localStorage.setItem('product5url', json.products.product5.url);
                localStorage.setItem('product5image1', json.products.product5.image1);
                localStorage.setItem('product5image2', json.products.product5.image2);
                localStorage.setItem('product5eeimgurl', json.products.product5.EEimgurl);

                localStorage.setItem('product6active', json.products.product6.active);
                localStorage.setItem('product6name', json.products.product6.name);
                localStorage.setItem('product6description', json.products.product6.description);
                localStorage.setItem('product6category', json.products.product6.category);
                localStorage.setItem('product6price', json.products.product6.price);
                localStorage.setItem('product6url', json.products.product6.url);
                localStorage.setItem('product6image1', json.products.product6.image1);
                localStorage.setItem('product6image2', json.products.product6.image2);
                localStorage.setItem('product6eeimgurl', json.products.product6.EEimgurl);

                localStorage.setItem('product7active', json.products.product7.active);
                localStorage.setItem('product7name', json.products.product7.name);
                localStorage.setItem('product7description', json.products.product7.description);
                localStorage.setItem('product7category', json.products.product7.category);
                localStorage.setItem('product7price', json.products.product7.price);
                localStorage.setItem('product7url', json.products.product7.url);
                localStorage.setItem('product7image1', json.products.product7.image1);
                localStorage.setItem('product7image2', json.products.product7.image2);
                localStorage.setItem('product7eeimgurl', json.products.product7.EEimgurl);

                localStorage.setItem('product8active', json.products.product8.active);
                localStorage.setItem('product8name', json.products.product8.name);
                localStorage.setItem('product8description', json.products.product8.description);
                localStorage.setItem('product8category', json.products.product8.category);
                localStorage.setItem('product8price', json.products.product8.price);
                localStorage.setItem('product8url', json.products.product8.url);
                localStorage.setItem('product8image1', json.products.product8.image1);
                localStorage.setItem('product8image2', json.products.product8.image2);
                localStorage.setItem('product8eeimgurl', json.products.product8.EEimgurl);

                //************************************************
                //Store Custom Profile Attributes in Local Storage
                //************************************************
                localStorage.setItem('useShoeSize', json.profileAttributes.useShoeSize);
                localStorage.setItem('useShirtSize', json.profileAttributes.useShirtSize);
                localStorage.setItem('usePreferredColor', json.profileAttributes.usePreferredColor);

                //************************************************
                //Store DMP Media Settings in Local Storage
                //************************************************
                localStorage.setItem('mediadetailsactive', json.dmp.mediadetails.activate);
                
                if(json.dmp.mediadetails.activate === "yes"){
                    localStorage.setItem('pageDMPtitle', json.dmp.mediadetails.pagename);
                    localStorage.setItem('pageDMPurl', json.dmp.mediadetails.pageurl);
                    localStorage.setItem('pageDMPiframe', json.dmp.mediadetails.iframeurl);
                    localStorage.setItem('pageDMPactive', "true");

                    if(json.dmp.displayad1.local){
                        localStorage.setItem('displayad1localimg', json.dmp.displayad1.local);
                        localStorage.setItem('displayad1imgfilename', json.dmp.displayad1.image);
                        localStorage.setItem('displayad1imgurl', imagebaseurl + json.dmp.displayad1.image);
                    }else{
                        localStorage.setItem('displayad1localimg', json.dmp.displayad1.local);
                        localStorage.setItem('displayad1imgfilename', json.dmp.displayad1.image);
                        localStorage.setItem('displayad1imgurl', json.dmp.displayad1.image);
                    }
                    if(json.dmp.displayad2.local){
                        localStorage.setItem('displayad2localimg', json.dmp.displayad2.local);
                        localStorage.setItem('displayad2imgfilename', json.dmp.displayad2.image);
                        localStorage.setItem('displayad2imgurl', imagebaseurl + json.dmp.displayad2.image);
                    }else{
                        localStorage.setItem('displayad2localimg', json.dmp.displayad2.local);
                        localStorage.setItem('displayad2imgfilename', json.dmp.displayad2.image);
                        localStorage.setItem('displayad2imgurl', json.dmp.displayad2.image);
                    }
                    if(json.dmp.displayad3.local){
                        localStorage.setItem('displayad3localimg', json.dmp.displayad3.local);
                        localStorage.setItem('displayad3imgfilename', json.dmp.displayad3.image);
                        localStorage.setItem('displayad3imgurl', imagebaseurl + json.dmp.displayad3.image);
                    }else{
                        localStorage.setItem('displayad3localimg', json.dmp.displayad3.local);
                        localStorage.setItem('displayad3imgfilename', json.dmp.displayad3.image);
                        localStorage.setItem('displayad3imgurl', json.dmp.displayad3.image);
                    }
                    if(json.dmp.displayad4.local){
                        localStorage.setItem('displayad4localimg', json.dmp.displayad4.local);
                        localStorage.setItem('displayad4imgfilename', json.dmp.displayad4.image);
                        localStorage.setItem('displayad4imgurl', imagebaseurl + json.dmp.displayad4.image);
                    }else{
                        localStorage.setItem('displayad4localimg', json.dmp.displayad4.local);
                        localStorage.setItem('displayad4imgfilename', json.dmp.displayad4.image);
                        localStorage.setItem('displayad4imgurl', json.dmp.displayad4.image);
                    }
                }

                localStorage.setItem('loadconfigfromjsonstatus', "success");

                console.log(">>>>> Finished Loading Brand Profile from brandprofile.json");
            });
            
            window.location.reload();
}