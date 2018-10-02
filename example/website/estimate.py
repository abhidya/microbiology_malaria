import sys
from math import exp
from scipy.stats import norm
from scipy.stats import uniform
from numpy import log10, power, arange, array, zeros, random, abs, set_printoptions, inf
import random as rand
import matplotlib.pyplot as plt

set_printoptions(threshold=inf)

# Defining 3 functions fitted to experimental data
powerlaw = lambda v: 1 - exp(-0.0037777154 * v ** 0.41129882)
threshold = lambda v: 0.06639757 if v < 20166.6408644 else 0.352561152
logistic_threshold = lambda v: (0.04131329044 / (0.04131329044 + exp(-0.0001102641 * v))) if v < 20737.338791655 else (
        0.04131329044 / (0.04131329044 + exp(-0.0001102641 * 20737.338791655 - 3.25839158 * (v - 20737.338791655))))

# Constructing data on infectivity from website
args = sys.argv[1]
arglist = args.split()  # turn the args string into list items

numbins = int(arglist[0])  # number of bins

numfunctions = int(arglist[1])  # number of functions

numsamples = int(arglist[2])  # numver of samples

cutoffs = []
probs = []
intervals = []
lengths = []

for i in range(3, 3 * numbins, 3):
    intervals.append([float(arglist[i]), float(arglist[i + 1])])
    cutoffs.append(float(arglist[i + 1]))
    probs.append(float(arglist[i + 2]) * 0.01)
    lengths.append(float(arglist[i + 1]) - float(arglist[i]))

# print(cutoffs)
# print(probs)
# print(intervals)
# print(lengths)

# Cache for cdfProbSpz
cdf_cache = zeros(int(max(cutoffs)) + 1)
cdf_cache[0] = 0


# Defining probability ditribution
def ProbSpz(x):
    for i in range(numbins):
        if (x >= intervals[i][0] and x <= intervals[i][1]):
            return probs[i], lengths[i]
            break


# Defining probability density function
def cdfProbSpz(x):
    if (cdf_cache[x] != 0):
        return cdf_cache[x]
    else:
        prob, length = ProbSpz(x)
        cdf_cache[x] = cdf_cache[x - 1] + (prob / length)
    return cdf_cache[x]


# Defining a sample from the distribution
def mosquito_sample(val_array):
    sample = rand.random()

    # return the index of closest value of sample in val_array
    index = (abs(val_array - sample)).argmin()

    return index + 1


def main():
    pl_flag = False
    thresh_flag = False
    logThres_flag = False

    if ("powerLaw" in arglist):
        pl_flag = True
    if ("threshold" in arglist):
        thresh_flag = True
    if ("logisticThreshold" in arglist):
        logThres_flag = True

    max_value = int(max(cutoffs))
    val_array = zeros(max_value)
    sample_array = zeros(numsamples)

    for i in range(max_value):
        val_array[i] = cdfProbSpz(i + 1)

    powerlaw_probs = zeros(numsamples)
    threshold_probs = zeros(numsamples)
    logisticthreshold_probs = zeros(numsamples)

    for i in range(numsamples):
        sample_array[i] = mosquito_sample(val_array)
        if (pl_flag):
            powerlaw_probs[i] = powerlaw(sample_array[i])
        if (thresh_flag):
            threshold_probs[i] = threshold(sample_array[i])
        if (logThres_flag):
            logisticthreshold_probs[i] = logistic_threshold(sample_array[i])

    # print("powerlaw_probs,")
    if (pl_flag):
        for i in powerlaw_probs:
            print(i)
    print(",")
    # print("thresholds_probs,")
    if (thresh_flag):
        for i in threshold_probs:
            print(i)
    print(",")

    # print("logtresh_probs,")

    if (logThres_flag):
        for i in logisticthreshold_probs:
            print(i)
    print(",")

    # plt.hist(log10(sample_array), 10)
    # plt.show()

    plt.hist(powerlaw_probs, normed=True)
   # plt.show()
    plt.hist(threshold_probs, normed=True)
   # plt.show()
    plt.hist(logisticthreshold_probs, normed=True)
   # plt.show()

    print("\n")


if __name__ == "__main__":
    main()
