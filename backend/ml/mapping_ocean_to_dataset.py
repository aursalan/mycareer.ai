def map_ocean_score(raw_score, target_min, target_max, raw_min=14, raw_max=70):
    """
    Maps a raw OCEAN score (range 14 to 70) to the dataset's min-max range.
    
    :param raw_score: The raw score (14 to 70)
    :param target_min: The minimum value in the dataset for the corresponding trait
    :param target_max: The maximum value in the dataset for the corresponding trait
    :param raw_min: The minimum raw score (default: 14)
    :param raw_max: The maximum raw score (default: 70)
    :return: The mapped value
    """
    return target_min + ((raw_score - raw_min) / (raw_max - raw_min)) * (target_max - target_min)

# Example usage:
# Define the min and max values for each OCEAN trait from the dataset
ocean_min_max = {
    "Openness": (0.0506, 0.2409),
    "Conscientiousness": (0.0761, 0.1819),
    "Extraversion": (0.0851, 0.2348),
    "Agreeableness": (0.0109, 0.0679),
    "Neuroticism": (-0.1291, -0.0719)
}

# Example: Mapping a raw score of 50 for each trait
raw_score = 50
mapped_values = {trait: map_ocean_score(raw_score, *ocean_min_max[trait]) for trait in ocean_min_max}

print(mapped_values)
