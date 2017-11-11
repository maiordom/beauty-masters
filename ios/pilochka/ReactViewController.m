//
//  ReactViewController.m
//  pilochka
//
//  Created by Alexander Malnev on 11/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "ReactViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

static NSString *const kBundleRoot = @"index.ios";
static NSString *const kModuleName = @"pilochka";

@interface ReactViewController ()

@property (nonatomic, copy, nullable) NSDictionary *launchOptions;
@property (nonatomic, strong, readonly) NSURL *jsBundleURL;

@end

@implementation ReactViewController

- (instancetype)initWithLaunchOptions: (NSDictionary *)launchOptions {
  self = [super init];
  if (self) {
    _launchOptions = launchOptions;
  }
  return self;
}

#pragma mark - UIViewController

- (void)loadView {
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:self.jsBundleURL
                                                      moduleName:kModuleName
                                               initialProperties:nil
                                                   launchOptions:self.launchOptions];
  rootView.backgroundColor = [UIColor whiteColor];
  self.view = rootView;
}

#pragma mark - Helpers

- (NSURL *)jsBundleURL {
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:kBundleRoot fallbackResource:nil];
}

@end
