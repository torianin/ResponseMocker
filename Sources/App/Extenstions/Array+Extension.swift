import Foundation

extension Array {
    
    // Source: https://stackoverflow.com/a/53085133/1819496

    /// Get at index object
    ///
    /// - Parameter index: Index of object
    /// - Returns: Element at index or nil
    func get(at index: Int) -> Element? {
        return self.indices.contains(index) ? self[index] : nil
    }
}
