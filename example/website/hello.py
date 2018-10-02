import sys
from numpy import array, zeros


args = sys.argv[1]
#functionCalls = sys.argv[2]


#Bins
#Probs

'''
if "powerLaw" in functionCalls:
	#Function call to powerLaw
if "threshold" in functionCalls:
	#Function call threshold
if "logisticThreshold" in functionCalls:
	#Function call logisticThreshold
'''

#print ("Hello %s" % args)



print (len(args))

arglist = args.split()
#print(len(arglist))
#print(arglist)


  
numbins = int(arglist[0])
numfunctions = int(arglist[1])

cutoffs = []
probs = []
intervals = []
lengths = []

for i in range(2, 3*numbins, 3):
  
  intervals.append([float(arglist[i]), float(arglist[i+1])])
  cutoffs.append(float(arglist[i+1]))
  probs.append(float(arglist[i+2])*0.01)
  lengths.append(float(arglist[i+1])-float(arglist[i]))
  
print(cutoffs)
print(probs)
print(intervals)
print(lengths)



#print "Hello %s" % who + " " + who2
