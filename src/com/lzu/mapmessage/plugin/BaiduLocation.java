package com.lzu.mapmessage.plugin;

import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import android.os.Looper;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;

// 百度定位插件
public class BaiduLocation extends CordovaPlugin {

	private static String LATITUDE = "latitude";

	private static String LONGITUDE = "longitude";

	private static String ERROR_MSG = "errorMsg";

	private JSONObject result = null;

	private Semaphore semaphore = new Semaphore(0);

	@Override
	public boolean execute(String action, JSONArray data,
			CallbackContext callbackContext) throws JSONException {

		boolean openGps = data.getBoolean(0);
		int waitSecond = data.getInt(1);

		new LocationThread(openGps).start();

		try {
			// 主线程最多等待定位子线程waitSecond秒，如果超过waitSecond秒主线程直接返回，不定了
			if (!semaphore.tryAcquire(waitSecond, TimeUnit.SECONDS)) {
				throw new Exception("错误：定位超时！");
			}
		} catch (Exception e) {
			callbackContext.error(e.getMessage());
			return true;
		}

		callbackContext.sendPluginResult(new PluginResult(
				PluginResult.Status.OK, result));
		callbackContext.success(result);

		return false;
	}

	class LocationThread extends Thread {

		private boolean openGps;

		public LocationThread(boolean openGps) {
			this.openGps = openGps;
		}

		public void run() {
			Looper.prepare();

			final LocationClient mLocationClient = new LocationClient(
					(Context) BaiduLocation.this.cordova.getActivity());

			setLoactionConfig(mLocationClient);

			mLocationClient.registerLocationListener(new BDLocationListener() {

				public void onReceiveLocation(BDLocation location) {
					try {
						result = new JSONObject();

						if (location.getLatitude() > 1
								|| location.getLongitude() > 1) {
							result.put(LATITUDE, location.getLatitude());
							result.put(LONGITUDE, location.getLongitude());
						} else {
							result.put(ERROR_MSG, "错误：定位失败！");
						}

						mLocationClient.stop();

						semaphore.release();
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}

			});

			mLocationClient.start();

			mLocationClient.requestLocation();

			Looper.loop();
		}

		private void setLoactionConfig(LocationClient mLocationClient) {
			LocationClientOption option = new LocationClientOption();
			option.setOpenGps(openGps);
			option.setCoorType("bd09ll");
			option.setScanSpan(5000);
			mLocationClient.setLocOption(option);
		}

	}

}
