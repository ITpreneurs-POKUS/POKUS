package com.reactnativedonotdisturb;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Objects;

@ReactModule(name = DoNotDisturbModule.NAME)
public class DoNotDisturbModule extends ReactContextBaseJavaModule {
    public static final String NAME = "DoNotDisturb";

    private final ReactApplicationContext mReactContext;

    public DoNotDisturbModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void isDoNotDisturbModeOn(Promise promise) {
        NotificationManager notificationManager = (NotificationManager)
          this.mReactContext.getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          promise.resolve(notificationManager.isNotificationPolicyAccessGranted());
        } else {
          promise.resolve(true);
        }
    }

    @ReactMethod
    public void openDoNotDisturbSettings(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          Intent intent = new Intent(android.provider.Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
          Objects.requireNonNull(getCurrentActivity()).startActivity(intent);
          promise.resolve(true);
        } else {
          promise.resolve(false);
      }
    }
}
