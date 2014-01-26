MyPasswords
===========

###PhoneGap installation

* Install NodeJS from [http://nodejs.org](http://nodejs.org)
* Install PhoneGap with command

> $ sudo npm install -g phonegap

###Create project

> $ phonegap create MyPasswords cc.unmi.mypassword MyPasswords

###Build project for iOS

> $ phonegap local build ios

After that, a XCode project is generated in the folder platforms/ios, we can open this XCode project, and run it in XCode.

###Run project in Simulator

> $ phonegap run ios

Actually, this run step executes build firstly.

If run into missing ios-sim, we should install ios-sim before running

> $ sudo npm install -g ios-sim

Then do phonegap run ios again

###Programming

Basically, the programming work focus on the folder www. Once finish editing, run the command

> $ phonegap run ios

to view the latest effect immediately.

###Install Plugin

For an instance, we'll install [org.apache.cordova.device](https://build.phonegap.com/plugins/250), it's used to get device information including below fields
> device { name, cordova, platform, uuid, version, model }

> $ phonegap plugin add https://github.com:apache/cordova-plugin-device.git

We'll a folder org.apache.cordova.device in plugins dirctory, and one item added into iso.json says "installed_plugins"

for now, we can call device.version with JavaScript codes, and run

> $ phonegap run ios

to see plugin's performance.