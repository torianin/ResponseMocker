//
//  DateHandler.swift
//  
//
//  Created by Torianin on 19/05/2020.
//
@testable import App
import Foundation

class FakeDateProvider: DateProviderType {
    
   func currentDate() -> Date {
      Date(timeIntervalSince1970: TimeInterval(1589842493))
   }
}
