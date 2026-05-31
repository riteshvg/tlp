---
title: 'CJA Migration: Key Metrics and How to Calculate'
date: 2025-06-16
tags:
  main: self learning
  topic1: Adobe Experience Platform Mobile SDK
  topic2: basics

thumbnailImagePosition: left
thumbnailImage: https://ik.imagekit.io/hyegquogx/The_Learning_Project/Back%20to%20basics%20%20Part%207.png
author:
  display_name: Ritesh Gupta
---

Some key metrics that you will need to derive when moving from AEP Mobile SDK to CJA

<!--more-->

Total Session Length: In summary, the Total Session Length in Adobe Analytics for the AEP Mobile SDK is a client-side calculation of the cumulative time an app is in the foreground, measured in seconds. This data is then sent to Adobe's servers during the subsequent app launch.

How Total Session Length is Calculated:
Lifecycle Metrics: The calculation relies on "Lifecycle" metrics automatically collected by the AEP Mobile SDK. These metrics track core user interactions like app launches, crashes, and how long the app is used.
Launch and Close: The session length is the time elapsed between when a user launches the app and when it is closed or sent to the background.[1]
Data is Sent on Relaunch: An important detail is that the data for a completed session, including its total length, is sent to Adobe Analytics when the user next launches the app.[1]
Session Timeout: A "session" is defined by a timeout period. A new session begins when a user opens the app for the first time or reopens it after the defined session timeout has passed.[2] The default timeout in the Mobile Core configuration is 300 seconds (5 minutes). This means if a user backgrounds the app and returns before 5 minutes have passed, it's considered the same session. If they return after 5 minutes, a new session starts.
Backdating Session Information: The SDK has a setting called "Backdate Previous Session Info". When enabled, this feature ensures that session length and crash information from a previous session are attributed correctly. It does this by backdating the session information hit to one second after the last hit of the previous session.
