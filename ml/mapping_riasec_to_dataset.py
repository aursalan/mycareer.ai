def map_score(raw_score, target_min, target_max, raw_min, raw_max):
    """
    Maps a raw score from its original range to a target min-max range.
    
    :param raw_score: The raw score
    :param target_min: The minimum value in the target range
    :param target_max: The maximum value in the target range
    :param raw_min: The minimum raw score
    :param raw_max: The maximum raw score
    :return: The mapped value
    """
    return target_min + ((raw_score - raw_min) / (raw_max - raw_min)) * (target_max - target_min)

# Define the min and max values for each RIASEC trait from the dataset
riasec_min_max = {
    "Realistic": (1.00, 7.00),
    "Investigative": (1.00, 7.00),
    "Artistic": (1.00, 7.00),
    "Social": (1.00, 7.00),
    "Enterprising": (1.00, 7.00),
    "Conventional": (1.66, 7.00)
}

# Example: Mapping a raw score of 15 for each trait
raw_score = 15
raw_min, raw_max = 5, 25  # Raw score range
mapped_values = {trait: map_score(raw_score, *riasec_min_max[trait], raw_min, raw_max) for trait in riasec_min_max}

print(mapped_values)
