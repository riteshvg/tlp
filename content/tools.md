---
title: "Automation Tools and Launch Extensions"
date: 2022-02-02
---

The best part about Adobe Experience Platform is its extensibility. The **API first** philosophy has led to creative developers and architects extending the features of the Platform and its services. I have been involved in creating a few tools to automate and simplify the workflow. Below are the four tools that I have conceptualized, architectected and then develop them with the help of developers. 

_Disclaimer: The first three tools are the intellectual property of my previous employers TA Digital and Adobe. I don't own or can share the source code_

#### Call Tracking Metrics Extension
- Developed for: TA Digital
- Platform: Adobe Launch
- Developer: Agastya Edullakanti
- Description: My first Adobe Launch extension that helps to integrate Call Tracking Metrics technology in an Adobe Experience Cloud platform. This extension helps to capture Adobe Analytics ECID and passes it to CallTrackingMetrics solution in real time. The ECID then becomes
the common connector between CallTrackingMetrics and Adobe Analytics. Later, a customer can upload a data source file to pass other important data points such as _Search query_, _Campaign_, _Source_, _Medium_ etc.
- Status: Published and available in Adobe Launch Exchange marketplace
- Links: [CallTrackingMetrics](https://www.calltrackingmetrics.com/products/integrations/adobe-analytics/) & [Adobe Launch Exchange](https://exchange.adobe.com/apps/ec/107695/calltrackingmetrics) 
 
#### Launch Property Migration Tool
- Developed for: TA Digital
- Platform: Adobe Launch
- Developer: Mahesh Vangala
- Description: This tool is one of my most favourite reason why I prefer the Adobe Experience Platform. The tool utilizes the Adobe Launch API and provides a quick and automated way to duplicate Launch properties across the same organisaton as well as 
another organisation. This leads to a lot of time being saved for the client and the consultants. And provides an error free experience.
- Status: Published and available internally in TA Digital
- Links: To be updated

#### Data Source Automator
- Developed for: Adobe India Private Limited
- Platform: Adobe Launch
- Developer: Prateek Kejriwal
- Description: This tool was another attempt by me to automate what seems like a boring and repetitive task. The Data Source Automator tool created a method to automate the manual and error-prone process of copy-paste data from a raw data file into an Adobe Data Source compatible file.
Not only that, the tool also helped in uploading the Data Sources file along with _.fin_ file to Adobe FTP Servers where it was automatically scheduled for processing. This tool saved a lot of manual effort for a media client that I was consulting for while in Adobe India. '
- Status: Published and available internally in Adobe India
- Links: [Data Source Automator deck](https://docs.google.com/presentation/d/1nfbdZSXXTwNHNOVmZKf_n-yXU-0iFpiq/edit?usp=sharing&ouid=102552349281525812378&rtpof=true&sd=true) & [GitHub](https://github.com/prateekkej/adobe-ds-processor)

#### Adobe Launch Switcher
- Developed for: Open Source Brokers
- Platform: Adobe Launch
- Developer: Open Source Broker, Alberta, Canada
- Description: This tool is currently being developed by me and a developer from Open Source Broker.
- Status: Being developed in conjunction with Open Source Broker
- Links: [Open Source Broker](https://opensourcebrokers.ca/launch-project-propsal/)