---
title: "由UIWebView轉成WKWebView"
category: "IOS"
cover: coding.jpg
tags: ["IOS","UIWebView", "WKWebView"]
author: Horst Leung
---
![Coding](./coding.jpg)

最近公司有個維持了很多年的ios project要update, 當然要順手把iOS 13就會壽中正寢的UIWebView改成WKWebView。

新增WebKit這些基本的就不說了。

##UIWebViewDelegate
WKWebView有2種delegate可以設定，一種是[WKUIDelegate](https://developer.apple.com/documentation/webkit/wkuidelegate), 另一種是[WKNavigationDelegate](https://developer.apple.com/documentation/webkit/wknavigationdelegate)。

###WKNavigationDelegate
原本在UIWebViewDelegate中的methods多半都是要改成WKNavigationDelegate的。大致上就是
+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| UIWebViewDelegate                                                 | WKNavigationDelegate                                                                           |
+===================================================================+================================================================================================+
| - webView:shouldStartLoadWithRequest:navigationType:              | - webView:decidePolicyForNavigationAction:decisionHandler:                                     |
+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| - webViewDidStartLoad:                                            | - webView:didCommitNavigation:                                                                 |
+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| - webViewDidFinishLoad:                                           | - webView:didFinishNavigation:                                                                 |
+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+
| - webView:didFailLoadWithError:                                   | - webView:didFailNavigation:withError: - webView:didFailProvisionalNavigation:withError:       |
+-------------------------------------------------------------------+------------------------------------------------------------------------------------------------+


###WKUIDelegate
這個是用來在webview中使用native的介面，例如alert。


WKWebView使用的資源較少，又支援WebGL，就算不是iOS13迫我升級，也應該考慮一下。不過要小心iOS 11以前的WKWebView是不太支援cookies的，原玩cookies的project最好升級到iOS11+了。

