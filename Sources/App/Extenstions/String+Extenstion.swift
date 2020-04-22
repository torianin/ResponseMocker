import Foundation

// Source: https://stackoverflow.com/a/57272276/1819496

extension String {
    func matches(path pattern: String) -> Bool {
        var strIndex = self.startIndex, matchIndex = self.startIndex
        var patternIndex = pattern.startIndex, asteriskIndex = pattern.endIndex

        while strIndex < self.endIndex {
            //Characters match, or question mark
            if patternIndex < pattern.endIndex
                && (self[strIndex] == pattern[patternIndex] || pattern[patternIndex] == "?") {
                strIndex = self.index(after: strIndex)
                patternIndex = pattern.index(after: patternIndex)
            }
            //Asterisk character
            else if patternIndex < pattern.endIndex && pattern[patternIndex] == "*" {
                asteriskIndex = patternIndex
                matchIndex = strIndex
                patternIndex = pattern.index(after: patternIndex)
            }
            else if asteriskIndex != pattern.endIndex {
                patternIndex = pattern.index(after: asteriskIndex)
                matchIndex = self.index(after: matchIndex)
                strIndex = matchIndex
            }
            else { return false }
        }

        //Asterisk character at the end of the pattern
        while patternIndex < pattern.endIndex && pattern[patternIndex] == "*" {
            patternIndex = pattern.index(after: patternIndex)
        }

        return patternIndex == pattern.endIndex
    }
}
