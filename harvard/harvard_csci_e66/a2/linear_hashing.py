item_count = 0
hash_bucket = [ [], [] ]

def main():
  while True:
    val = input('enter a digit: ')
    val = int(val)
    item_count += 1
    if item_count > len(hash_bucket)*3:
      hash_bucket.append([])
    print(hash_bucket)
    
