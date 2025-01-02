---
title: "Adobe Managed Certificate Program "
date: 2023-02-09
tags:
    main: adobe managed certificate program
    topic1: adobe
    topic2: third party and first party tracking
thumbnailImagePosition: left
thumbnailImage: https://imagedelivery.net/aOXfYgXj8p9Bd9bCC1ppIQ/d8094811-2679-4cb9-86e3-7b0adb50f600/public
author:
     display_name: Ritesh Gupta
---

Are you confused about the difference between first-party or third-party cookie? Do you want to know how Adobe can help you mitigate the issue of browser blocking third-party cookies and limiting the time to live of first party cookies?

<!--more-->

Tracking in Adobe Analytics or any other tracking tool works on the basic concept of dropping cookies in the user’s browser. Cookies are small JavaScript snippets that are created to personalize a visitor’s experience. It is also used to track visitor’s activities and share it with the tracking companies. There are multiple tracking cookies that a tracking tool drops in the visitor browser. Each one of them is responsible for tracking the behavioral and event based data of visitor. And sending it over to Adobe servers for visitor profiling and identification.

Cookies come in two flavors: First party and third party. A first party cookie is owned or made to look like it is own by the site that you are visiting. For e.g., you are reading this article on a site with the domain name: thelearningproject.in. Any cookie that has got ‘thelearningproject.in’ in its setting will be considered as first party by your browser.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/first_party_cookies.png">}}

The second flavor of cookie is known as ‘third party’ cookie. This cookie is not owned by your site, but by other tracking companies such as Google, Adobe, Facebook etc. These cookies mostly are used to track, and serve ads by ad networks.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/third_party_cookies.png">}}

Recently, there has been a lot of action and updates in terms of removing the third-party cookie setup completely. This is due to the privacy issues that visitors face where there browsing history is shared without their consent or unknowingly. Blocking third party cookies has huge implications for many companies who used to rely on third party cookies for running their visitor profiling. But the recent interest by Google, Apple and Firefox in rejecting or attempting to block third party cookies is very high. And it is just a matter of time before third party cookies are blocked for every visitor by default.

Apple has gone ahead a step further with its Intelligent Tracking Prevention technology that it ships with its Safari browser. This technology blocks third party cookies by default, and also reduces the lifespan of other types of visitor identifiers like first party cookies and local storage.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/apple_intelligent_tracking_prevention.png">}}

While visitor tracking companies such as Adobe and Google look at how to mitigate the risk with first party tracking restrictions, Adobe has for years been advocating use of first party cookie set up for all its clients. It basically involves creating a CNAME setting which enables forwarding tracking data from a custom domain specified in the CNAME implementation to Adobe’s collection servers. This makes the browser feel as if the tracking is happening on the domain that is being visited.

Having a first party cookie data collection setup requires making change to company’s DNS settings to configure a CNAME alias to an Adobe hosted domain. It involves working with Adobe to obtain an SSL certificate. The process of obtaining the SSL Certificate is often a time consuming one. Moreover, if the certificate, which is issued only for one year, gets expired before being renewed, you can see a drop in visitor tracking. To avoid this situation, Adobe has worked out a Adobe Managed Certificate Program.

The Certificate Program involves Adobe working on the organization’s behalf with DigiCert to automate purchase and renewal of SSL Certificates. The Adobe Managed Certificate Program is the recommended process for setting up first party SSL certificate needed for CNAME implementation which ensures your Adobe collection server matches your site domain.

{{<figure src = "https://ik.imagekit.io/hyegquogx/The_Learning_Project/AMC_Process.png">}}  

With the growing interest in blocking tracking cookies, third party cookie setup is definitely scheduled for a sun set. Even first party cookies which are not owned by the domain are going to be short lived. But until there is any other alternative set to override this change, it is highly recommended to make use of the Adobe Managed Certificate Program for CNAME implementation.

That is all for this blog post. Do let me know what is your thought on first party and third party cookie tracking. Drop me a line at _(ritesh)at(thelearningproject)dot(in)_. 