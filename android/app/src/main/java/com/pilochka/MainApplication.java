package com.pilochka;

import android.app.Application;
import android.util.Log;

import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.smixx.fabric.FabricPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSentryPackage(MainApplication.this),
          new LinearGradientPackage(),
          new RNFetchBlobPackage(),
          new FabricPackage(),
          new ImagePickerPackage(),
          new MapsPackage(),
          new GoogleAnalyticsBridgePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
