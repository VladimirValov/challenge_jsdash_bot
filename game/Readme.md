* Choose the nearest diamond.
* Calculate the distance in X and Y.
* Move to the goal.

* If the obstacle is a single running it.
* If not then release the two rats which avoid obstacles and find the shortest path  to the edge.
* Not implemented as it should check the falling rocks and butterflies.

**Rats should be trained better.**


node jsdash.js --ai=submission.js --log=log.json --force --freq-space=1 --freq-dirt=3

node jsdash.js --ai=submission.js --log=log.json --force --still

jsdash.js --ai=submission.js --log=log.json --force --freq-space=0 --freq-dirt=20 --butterflies=0 --freq-diamond=1

node jsdash.js --ai=submission.js --log=log.json --force --freq-brick=5 --freq-space=0 --freq-dirt=75 --freq-diamond=5 --butterflies=0

выход из тупика

qq


node jsdash.js --ai=submission.js --log=log.json --force --freq-brick=10 --freq-space=0 --freq-dirt=75 --freq-diamond=7 --butterflies=0 --seed=439897462


 seed 507000591 сразу тупик

удачный
node jsdash.js --ai=submission.js --log=log.json --force  --in-process --butterflies=0 --seed=1310148788
node jsdash.js --ai=submission.js --log=log.json --force  --in-process --butterflies=0 --seed=1310148789