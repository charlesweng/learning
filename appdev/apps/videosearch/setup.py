#!/usr/bin/env python3

#Setup Environment Keys
youtube_api_key = input("Please specify your YouTube API Key: ")

#Read all text inside environment file
api_keys = open(".env", "r").read()

#Replace all api key variables
api_keys = api_keys.replace("#YOUTUBE_API_KEY", youtube_api_key)

#Write text with newly replaced api keys to file
new_file = open(".env", "w")
new_file.write(api_keys)
new_file.close()
