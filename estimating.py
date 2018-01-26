from math import exp
from scipy.stats import norm
from scipy.stats import uniform
from numpy import log10, power, arange,array, zeros, random, abs
import random as rand
import matplotlib.pyplot as plt

# Defining 3 functions fitted to experimental data
powerlaw = lambda v, lam, n : 1 - exp(-lam*v**n)
threshold = lambda v, p_min, p_max, M_cr : p_min if v<M_cr else p_max
logistic_threshold = lambda v, lam, p_m, lam2, M_cr : (p_m/(p_m + exp(-lam*v))) if v<M_cr else (p_m/(p_m + exp(-lam*M_cr - lam2*(v - M_cr))))  

# Data on infectivity
cutoffs = [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000]
probs = [0.03, 0.056, 0.1, 0.255, 0.204, 0.15, 0.104, 0.056, 0.039, 0.006]
intervals = ((1, 500), (500, 1000), (1000, 2000), (2000, 4000), (4000, 8000), (8000, 16000), (16000, 32000), (32000, 64000), \
             (64000, 128000), (128000, 256000))

# Defining probability ditribution and plotting it on linear and log scale
     # dist = ProbabilityDistribution[Sum[probs[[i]]*PDF[UniformDistribution[intervals[[i]],x],{i,1,Length[probs]}],{x,1,Max[cutoffs]}]
     # ProbSpz[x_] = PDF[dist,x]

def ProbSpz(x):

  dist = 0
#  for i in range(len(probs)):
#    dist = dist+probs[i]*uniform.pdf(x, intervals[i][0], intervals[i][1]-intervals[i][0])
 
  return dist


def cdfProbSpz(x):
  Prob = 0


  for i in range(x):
    Prob+=ProbSpz(i+1)

  return Prob


def mosquito_sample(val_array):
  sample = rand.random()
  
  index = (abs(val_array-sample)).argmin()

  return index+1








#nboot = 10000

#boot1 = random.choice(ProbSpz(cutoffs), nboot, p=probs)




def main():
#  print (ProbSpz(8000))
#  print (ProbSpz(cutoffs))

 # arr = arange (0, 256000, 0.01);

#  plt.plot(cutoffs, ProbSpz(cutoffs))
#  plt.plot(arr, ProbSpz(arr))
#  plt.show()

#  print(boot1)
#  plt.hist(boot1)
#  plt.show()

 # plt.hist(log10(boot1))
#  plt.show()
#  max_value = max(cutoffs)
  max_value = 1000
  val_array = zeros(max_value)

#  print(max_value)
#  print (cdfProbSpz(100))


  for i in range(max_value):
    val_array[i] = cdfProbSpz(i+1)
#    print(i, cdfProbSpz(i+1))

#  print(val_array)

  for i in range(100):
    print(mosquito_sample(val_array))
  

if __name__ == "__main__":
  main()
