---
title: "Anonymizing IP Address"
date: 2022-10-06
tags:
    main: adobe analytics debugging
    topic: how to anonymize IP for compliance
thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/IP_Address_Anonymizing.png
author:
     display_name: Ritesh Gupta
---

Anonymizing IP address is the act of removing the IP address from the web analytics tracking hit. As we know it is out of the box setting and is captured just as the user agent and other user level details are recorded. By tracking IP , it might impact Geo Location, Processing Rules, Marketing Channels that are IP based. Instead, there are two options that are available for anonymizing the IP Address 

<!--more-->

1.	Last Octet Method: In this method, the last octet of the IP address is replaced with a 0. This method is applied before processing of any data which impacts all Geo location-based reports
 
2.	IP Obfuscation Method: This method converts the entire IP address to a meaningless hash. In this method all the processing happens first and then the IP address is altered. This ensures that the Geo Location info is maintained and as a result bot rules, processing rules, VISTA rules and Marketing Channel rules all work. But post processing it is impossible to look up any information related to IP – there is absolutely no IP maintained in any Analytics system

That is all for this blog post. Drop me a line at _(ritesh)at(thelearningproject)dot(in)_. 