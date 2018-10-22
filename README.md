# Haska
Haska is code-less back-end services platform which means you can create your own services like restful API's or admin dashboard for managing your data's in database by defining your models and properties with lots of configurations and options in our GUI environment.
> You can easily create your own back-end services such as Rest-ful API, Admin Dashboard, Documentations and so on based on your models definition and configurations without any code.
      
By Haska you can start your next project without any delay at start because it's fast and easy to create your own API endpoints or the other services at start of your application. Haska current services are :

 - **Restful API**: based on your models definition, Haska generating lots of API endpoints (CRUD) with playground to test and whole documentations.
 - **Admin dashboard**: Haska generate admin dashboard for managing your datas in database. As admin you have an access to dashboard for managing your data and users.
 - **Monitoring**: We provide powerfull monitoring system for each project that you built with our platform. You can monitoring your services like errors, progresses, CPU usage and several awesome informations.
 - **Documentation**: Haska automatically generate documentation based on your API's and services.

 
 

    

![Models manager environment](https://haska.io/images/screenshots/sc_1.jpg)

Visit [haska.io](https://haska.io/) to download OSX version and learn more about Haska and services.

## Installing

### Prerequisites

-   [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/)

### macOS
Download the latest  [Haska release](https://haska.io/download).    

If you want to install this repository in your computer as contributor you can follow the below instruction :

    git clone https://github.com/hasska/client.git   
Install packages :

    npm install
Build for release or dev by :

    npm run build
    
Running electron application:

    npm run electron

## Building
We’ll be using [electron-packager](https://github.com/electron-userland/electron-packager) for building our application for release version  of every operations systems. Currently Haska only support mac OSX and as contributor you can work on the other operation services build.

for use in npm scripts

    npm install electron-packager --save-dev

for use from cli

    npm install electron-packager -g

then run below in cmd:
```
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
```
This will:

-   Find or download the correct release of Electron
-   Use that version of Electron to create a app in  `<out>/<appname>-<platform>-<arch>`  _(this can be customized via an optional flag)_

`--platform`  and  `--arch`  can be omitted, in two cases:

-   If you specify  `--all`  instead, bundles for all valid combinations of target platforms/architectures will be created.
-   Otherwise, a single bundle for the host platform/architecture will be created.

For an overview of the other optional flags, run  `electron-packager --help`  or see  [usage.txt](https://github.com/electron-userland/electron-packager/blob/master/usage.txt). For detailed descriptions, see the  [API documentation](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md).

If  `appname`  is omitted, this will use the name specified by "productName" or "name" in the nearest package.json.

**Characters in the Electron app name which are not allowed in all target platforms' filenames (e.g.,  `/`), will be replaced by hyphens (`-`).**

## Tutorial
We prepared tutorials for how you should work with Haska and [getting started](https://haska.gitbook.io/tutorial).

## Contribution
We are working on contribution manual and instructions for being more structural at the beginning of contributions and will be release soon right here. 
If you want to contribute on this source code you are welcome and thanks for taking the time to contribute to our community. Major things TODO at this stage listed as below:

 - [*] Make built-in default models infrastructure and show cases
 - [ ] Deployment methods like docker and the other CI/CD
 - [ ] Custom method definition for each model
 - [ ] Build Linux and Windows release version

## Licence

(The MIT License) Copyright (c) 2018 Haska BV. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
