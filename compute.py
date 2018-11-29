import random as rand
from math import exp
import scipy.stats  as stats
from numpy import zeros, abs, set_printoptions, inf
import statistics
set_printoptions(threshold=inf)


def compute(functionLaw, size, probabs, binsStart, binsEnd):
    # Defining 3 functions fitted to experimental data
    powerlaw = lambda v: 1 - exp(-0.0037777154 * v ** 0.41129882)
    threshold = lambda v: 0.06639757 if v < 20166.6408644 else 0.352561152
    logistic_threshold = lambda v: (
            0.04131329044 / (0.04131329044 + exp(-0.0001102641 * v))) if v < 20737.338791655 else (
            0.04131329044 / (0.04131329044 + exp(-0.0001102641 * 20737.338791655 - 3.25839158 * (v - 20737.338791655))))

    # Constructing data on infectivity from website

    numbins = len(binsStart)  # number of bins

    numfunctions = len(functionLaw)  # number of functions

    numsamples = int(size)  # number of samples

    cutoffs = []
    probs = []
    intervals = []
    lengths = []

    for i in range(numbins):
        intervals.append([float(binsStart[i]), float(binsEnd[i])])
        cutoffs.append(float(binsEnd[i]))
        probs.append(float(float(probabs[i]) * 0.01))
        lengths.append(float(binsEnd[i]) - float(binsStart[i]))

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

    max_value = int(max(cutoffs))
    min_value = int(min(min(intervals)))
    val_array = zeros(max_value)
    sample_array = zeros(numsamples)

    for i in range(min_value, max_value):
        val_array[i] = cdfProbSpz(i + 1)

    response = {}

    for model in functionLaw:

        if model == "powerLaw":
            powerlaw_probs = zeros(numsamples)
            for i in range(numsamples):
                # sample_array[i] = mosquito_sample(val_array)
                powerlaw_probs[i] = powerlaw(mosquito_sample(val_array))
            response['powerLaw'] = powerlaw_probs.tolist()
            response['powerLaw_median'] = statistics.median(powerlaw_probs)
            response['powerLaw_lower'] = powerlaw_probs[int(len(powerlaw_probs)*.0275)]
            response['powerLaw_higher'] = powerlaw_probs[int(len(powerlaw_probs)*.975)]
        if model == "threshold":
            threshold_probs = zeros(numsamples)
            for i in range(numsamples):
                threshold_probs[i] = threshold(mosquito_sample(val_array))
                threshold_probs[i] = stats.binom.rvs(n=100, p=threshold(mosquito_sample(val_array)), size=1) / 100
            response['threshold'] = threshold_probs.tolist()
            response['threshold_median'] = statistics.median(threshold_probs)
            response['threshold_lower'] = threshold_probs[int(len(threshold_probs)*.0275)]
            response['threshold_higher'] = threshold_probs[int(len(threshold_probs)*.975)]

        # random.randint(1,101)
        if model == "logisticThreshold":
            logisticThreshold_probs = zeros(numsamples)
            for i in range(numsamples):
                logisticThreshold_probs[i] = logistic_threshold(mosquito_sample(val_array))
            response['logisticThreshold'] = logisticThreshold_probs.tolist()
            response['logisticThreshold_probs_median'] = statistics.median(logisticThreshold_probs)
            response['logisticThreshold_probs_lower'] = logisticThreshold_probs[int(len(logisticThreshold_probs)*.0275)]
            response['logisticThreshold_probs_higher'] = logisticThreshold_probs[int(len(logisticThreshold_probs)*.975)]
    return response
