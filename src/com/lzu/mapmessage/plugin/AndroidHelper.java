package com.lzu.mapmessage.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;
import android.widget.Toast;

public class AndroidHelper extends CordovaPlugin {

	private static String ACTION_EXIT = "EXIT";
	
	private static String ACTION_TOAST = "TOAST";
	
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		
		   System.out.println("action:" + action);
		  
		   if(ACTION_EXIT.equals(action)) {
			   System.exit(1);
		   }
			   
		   if(ACTION_TOAST.equals(action)) {
			   try {
				    String msg = args.getString(0);
				    Boolean isShortTime = args.getBoolean(1);
				    System.out.println("msg:" + msg + " isShortTime:" + isShortTime);
					toast(msg, isShortTime);
			   } catch (JSONException e) {
					e.printStackTrace();
				    callbackContext.error(e.getMessage()); 
				    return false; 	
			   }
		   }
		
		   callbackContext.success(); 
	       return true; 
	}
	
	/**
	 * 显示Toast
	 * 
	 * @param message
	 *            显示内容
	 * @param isShortTime
	 *            决定Toast显示的时间: true -- 2秒 ；false -- 3.5秒
	 */
	public synchronized void toast(final String message,
			final boolean isShortTime) {
		final Activity activity = this.cordova.getActivity();
		Runnable runnable = new Runnable() {
			public void run() {
				int toast_time = (isShortTime) ? Toast.LENGTH_SHORT
						: Toast.LENGTH_LONG;
				Toast.makeText(activity, message, toast_time).show();
			}
		};
		activity.runOnUiThread(runnable);
	}
	
	
	

}
