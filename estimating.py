from math import exp
from scipy.stats import norm
from scipy.stats import uniform
from numpy import log10, power, arange,array, zeros, random, abs
import random as rand
import matplotlib.pyplot as plt

# Defining 3 functions fitted to experimental data
powerlaw = lambda v: 1 - exp(-0.00377*v**0.411)
threshold = lambda v, p_min, p_max, M_cr : p_min if v<M_cr else p_max
logistic_threshold = lambda v, lam, p_m, lam2, M_cr : (p_m/(p_m + exp(-lam*v))) if v<M_cr else (p_m/(p_m + exp(-lam*M_cr - lam2*(v - M_cr))))  

# Data on infectivity
cutoffs = [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000]
probs = [0.03, 0.056, 0.1, 0.255, 0.204, 0.15, 0.104, 0.056, 0.039, 0.006]
intervals = ((1, 500), (500, 1000), (1000, 2000), (2000, 4000), (4000, 8000), (8000, 16000), (16000, 32000), (32000, 64000), \
             (64000, 128000), (128000, 256000))
lengths = [500, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000]

# Cache for cdfProbSpz
cdf_cache = zeros(256001)
cdf_cache[0] = 0


# Defining probability ditribution

def ProbSpz(x):
#  dist = 0
#  for i in range(len(probs)):
#    dist = dist+probs[i]*uniform.pdf(x, intervals[i][0], intervals[i][1]-intervals[i][0])
  if (x<=500):
    return probs[0], 0
  elif (x>500 and x<=1000):
    return probs[1], 1
  elif (x>1000 and x<=2000):
    return probs[2], 2
  elif (x>2000 and x<=4000):
    return probs[3], 3
  elif (x>4000 and x<=8000):
    return probs[4], 4
  elif (x>8000 and x<=16000):
    return probs[5], 5
  elif (x>16000 and x<=32000):
    return probs[6], 6
  elif (x>32000 and x<=64000):
    return probs[7], 7
  elif (x>64000 and x<=128000):
    return probs[8], 8
  elif (x>128000 and x<=256000):
    return probs[9], 9
 

# Defining probability density function
def cdfProbSpz(x): 

  if (cdf_cache[x] != 0):
    return cdf_cache[x]
  else:
    
    cdf_cache[x] = cdf_cache[x-1]+(ProbSpz(x)[0]/lengths[ProbSpz(x)[1]])
  return cdf_cache[x]
'''
  Prob = 0

  for i in range(x):
    Prob+=ProbSpz(i+1)

  return Prob
'''

# Defining a sample from the distribution
def mosquito_sample(val_array):
  sample = rand.random()
  
  # Return the index of closest value of sample in val_array
  index = (abs(val_array-sample)).argmin()

#  print (sample, val_array[index+1])
  return index+1



def main():
#  max_value = max(cutoffs)
  max_value = 256000
  val_array = zeros(max_value)
  sample_array = zeros(10000)
  disease_probs = zeros(10000)


  for i in range(max_value):
    val_array[i] = cdfProbSpz(i+1)
#    print(i, cdfProbSpz(i+1))

#  print(val_array)
#  plt.plot(val_array)
#  plt.show()

#  print(mosquito_sample(val_array))

  for i in range(10000):
#    print(mosquito_sample(val_array))
    sample_array[i] = mosquito_sample(val_array)
    disease_probs[i] = powerlaw(sample_array[i])
#  print(sample_array)
  plt.hist(log10(sample_array), 10)
  plt.show()

  plt.hist(disease_probs, normed = True)
  plt.show()

  




if __name__ == "__main__":
  main()
