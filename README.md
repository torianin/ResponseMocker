# Response Mocker
Response Mocker is a simple configurable service to mock API responses powered by Vapor 4.

## Getting Started

### Prerequisites
- Swift 5.3 or greater (using Linux or macOS is recommended).

## Features

**Matching of requests to stubs** with wildcard characters support:
- An asterisk (*) represents zero or more characters.
- A question mark (?) represents any single character.

**Customisable placeholders** allow to update the response content in runtime:
- <%Date|-60|yyyy-MM-dd'T'HH:mm:ss'Z'%> will display the date shifted by 60 seconds

## Installation - Ubuntu 18.04
Clone or download the source files 
```
git clone https://github.com/torianin/ResponseMocker
```
Install npm ([NVM is recommened](https://github.com/nvm-sh/nvm))
```
nvm install node
```
Install swift 5.3 ([swiftenv is recommened](https://github.com/kylef/swiftenv))
```
swiftenv install 5.3
```

## Deployment


## Built With

### Backend

* [Vapor](https://vapor.codes/) -  A server-side Swift web framework

### Frontend

* [React](https://reactjs.org/) -  A JavaScript library for building user interfaces

## Author

* **Robert Ignasiak**
