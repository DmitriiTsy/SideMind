
# Project Title

SideMind


## Installation

Running application local

```bash
git clone the repo
```

```bash
yarn install / yarn rebuild
```





    
## Update the ios podfile with below code if not exist


```bash
pod 'react-native-config/Extension', :path => '../node_modules/react-native-config'
```

```bash
platform :ios, '16.4' 
```

```bash
cd ios and pod install
```

## Checks on xcode

```bash
Under xcode tab  product >> edit schema >> build >> pre-actions has below code with schema name of SideMind
```


```bash
make sure it has only this script echo "config/production.env" > /tmp/envfile
```


## Checks on pod packages

```bash
Make sure React-codegen minimum deployment is 16.4 by following the below instruction
```


```bash
under project open in xcode >> click on pods folder and scroll to and click React-codegen pods then click on general setting and set the minimum deployment to 16.4
```

## Final step

```bash
click play button to build
```





