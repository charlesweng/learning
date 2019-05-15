from parameterized import parameterized

import ps1_queries
import pprint
import sqlite3
import unittest

# Grabbing queries from ps1_queries.py
queries = [item for item in dir(ps1_queries) if not item.startswith('__')]
queries = list(map(lambda q: getattr(ps1_queries, q), queries))


# Parameterized Test Case
class PS1Test(unittest.TestCase):
  
  @parameterized.expand([
  ])
  def test_queries(self):
    c = conn.connect('movie.sqlite')
    c.execute()

