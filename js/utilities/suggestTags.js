const tagDictionary = {
  'Education': /\b(school|education|learning|study|teach(ing)?)\b/i,
  'Technology': /\b(computer|software|programming|code|tech(nology)?)\b/i,
  'Health': /\b(health|fitness|exercise|diet|nutrition)\b/i,
  'Travel': /\b(travel|vacation|trip|journey|tour(ism)?)\b/i,
  'Food': /\b(food|cook(ing)?|recipe|eat(ing)?|cuisine)\b/i
};

export function suggestTags(title) {
  const suggestedTags = [];
  
  for (const [tag, regex] of Object.entries(tagDictionary)) {
    if (regex.test(title)) {
      suggestedTags.push(tag);
    }
  }
  
  return suggestedTags;
}