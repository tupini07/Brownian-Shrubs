# Brownian-Shrubs
Procedural shrubs generation with three.js and brownian motion!

## To Run:
Simply open the `index.html` file in your browser and everything will (should) work fine!

## Tree Parameter Explanation:
This parameters come to be the genes of the tree and they control the way the tree grows, changing the parameters will drastically change the way the outcome looks and it is what controls if your browser crashed or not.
All the parameters that end in `Dim` or `DimP` represent a percentage an it's value goes from *0* to *1*.
- **segmentLenght:**  This is the length of the first segment of the tree
- **segmentLenghtDim:**  `segmentLenght * segmentLenghtDim` is the length of the 'next' segment
- **maxSegmentsTrunk:** The trunk will grow until this maximum is reached, sub-branches of the trunk will get this value times `maxSegmentsDimP`
- **maxSegmentsDimP:** `maxSegmentsTrunk * maxSegmentsDimP` is the max segments that will have the sub-branch
- **pSubBranch:** This is the percentage of the length at which a new sub-branch is going to be created
- **radius:** The base radius of the trunk
- **radiusDimP:** `radius * radiusDimP` is the radius of the next segment
- **minRadius:** If a segment has less radius than this it will not be drawn and the growth of the branch to which it belongs stops.
- **maxDepth:** The maximum number of sub-branches the trunk can have (the sub-branch of the sub-branch of, etc..)
- **color:** For the moment this is not implemented but it represent the starting color of the trunk and a value between *0* and *16777215* (which is *0xffffff*)
- **seed:** The seed for the p-random number generator
