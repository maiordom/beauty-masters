/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "ReactViewController.h"
#import <React/RCTLinkingManager.h>
@import GoogleMaps;

static NSString *const kGoogleMapsAPIKey = @"AIzaSyD7u--7uoorLS369FEIpdwjxB5fMPjrrnU";

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self setupGoogleMaps];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[ReactViewController alloc] initWithLaunchOptions:launchOptions];
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

#pragma mark - Linking

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

#pragma mark - Setup

- (void)setupGoogleMaps {
  [GMSServices provideAPIKey:kGoogleMapsAPIKey];
}

@end
