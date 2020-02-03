#
# CSCI E-66: Problem Set 1, SQL Programming Problems
#

#
# For each problem, use a text editor to add the appropriate SQL
# command between the triple quotes provided for that problem's variable.
#
# For example, here is how you would include a query that finds the
# names and years of all movies in the database with an R rating:
#
sample = """
         SELECT name, year
         FROM Movie
         WHERE rating = 'R';
         """

#
# Problem 5. Put your SQL command between the triple quotes found below.
#
problem5 = """
					 SELECT name, pob, dob
           FROM Person
           WHERE name = 'Emma Stone' OR name = 'Rachel Weisz';
           """

#
# Problem 6. Put your SQL command between the triple quotes found below.
#
problem6 = """
           SELECT COUNT(id)
           FROM Movie
           WHERE runtime > 200;
           """

#
# Problem 7. Put your SQL command between the triple quotes found below.
#
problem7 = """
           SELECT m.name, o.type, o.year
           FROM Movie m
             JOIN Oscar o ON m.id = o.movie_id
             JOIN Person p ON p.id = o.person_id
           WHERE p.name = 'Christian Bale';
           """

#
# Problem 8. Put your SQL command between the triple quotes found below.
#
problem8 = """
           SELECT COUNT(DISTINCT pd.name)
           FROM (SELECT *
                 FROM Person
                   JOIN Director ON id = director_id
                 WHERE pob NOT LIKE '%USA') pd, 
                (SELECT *
                 FROM Person
                   JOIN Actor ON id = actor_id
                 WHERE pob NOT LIKE '%USA') pa
           WHERE pd.movie_id = pa.movie_id;
           """

#
# Problem 9. Put your SQL command between the triple quotes found below.
#
problem9 = """
           SELECT year, AVG(runtime)
           FROM movie
           GROUP BY year
           ORDER BY year;
           """

#
# Problem 10. Put your SQL command between the triple quotes found below.
#
problem10 = """
           SELECT
             name,
             dob
           FROM person
           WHERE name LIKE 'Sam %';
            """

#
# Problem 11. Put your SQL command between the triple quotes found below.
#
problem11 = """
            SELECT name
            FROM movie
            WHERE runtime < (SELECT min(runtime)
                 FROM movie m
                   JOIN oscar o ON m.id = o.movie_id
                 WHERE lower(o.type) LIKE '%best%picture%');
            """

#
# Problem 12. Put your SQL command between the triple quotes found below.
#
problem12 = """
            SELECT
              p.name,
              COUNT(*) AS top_movie_count
            FROM Person p
              JOIN Director d ON p.id = d.director_id
              JOIN Movie m ON m.id = d.movie_id
            WHERE earnings_rank <= 200
            GROUP BY p.name
            HAVING top_movie_count >= 4
            ORDER BY top_movie_count DESC;
            """

#
# Problem 13. Put your SQL command between the triple quotes found below.
#
problem13 = """
            SELECT
              earnings_rank,
              name,
              COUNT(movie_id)
            FROM Movie
              JOIN Oscar ON id = movie_id
            GROUP BY earnings_rank, name
            HAVING earnings_rank <= 25
            ORDER BY earnings_rank;
            """

#
# Problem 14. Put your SQL command between the triple quotes found below.
#
problem14 = """
            SELECT COUNT(DISTINCT id)
            FROM (SELECT p.id
                  FROM person p
                    JOIN actor a ON a.actor_id = p.id
                    JOIN movie m ON m.id = a.movie_id
                  WHERE m.earnings_rank IS NULL) AS bad_actors
            WHERE bad_actors.id NOT IN (SELECT director_id
                                        FROM director);
            """

#
# Problem 15. Put your SQL command between the triple quotes found below.
#
problem15 = """
            SELECT
              movie,
              function
            FROM (SELECT
                    a.movie_id AS movie_id,
                    a.actor_id AS person_id,
                    m.name     AS movie,
                    'actor'    AS function
                  FROM actor a
                    JOIN movie m ON a.movie_id = m.id
                  UNION
                  SELECT
                    d.movie_id    AS movie_id,
                    d.director_id AS person_id,
                    m.name        AS movie,
                    'director'    AS function
                  FROM director d
                    JOIN movie m ON d.movie_id = m.id) AS u
              JOIN person p ON u.person_id = p.id
            WHERE p.name = 'Denzel Washington'
            ORDER BY movie_id;
            """

#
# Problem 16. Put your SQL command between the triple quotes found below.
#
problem16 = """
            SELECT
              m.name,
              MAX(o.year)
            FROM Movie m
              JOIN oscar o ON m.id = o.movie_id
            WHERE m.rating LIKE '%G%' AND lower(o.type) LIKE '%best%picture%';
            """

#
# Problem 17. Put your SQL command between the triple quotes found below.
#
problem17 = """
            UPDATE movie
            SET rating = 'PG-13'
            WHERE name = 'Indiana Jones and the Temple of Doom';
            """

#
# Problem 18 (required for grad-credit students; optional for others). 
# Put your SQL command between the triple quotes found below.
#
problem18 = """
            SELECT DISTINCT
              name,
              o.year
            FROM movie m
              JOIN oscar o ON m.id = o.movie_id
            WHERE m.id IN (SELECT movie_id
                           FROM oscar
                           WHERE lower(type) LIKE '%best%picture%') AND 
                  m.id IN (SELECT movie_id
                           FROM oscar
                           WHERE lower(type) LIKE '%best%director%');
            """

#
# Problem 19 (required for grad-credit students; optional for others). 
# Put your SQL command between the triple quotes found below.
#
problem19 = """
            SELECT
              rating,
              MIN(avg_runtime)
            FROM (SELECT
                    rating,
                    AVG(runtime) AS avg_runtime
                  FROM movie
                  WHERE rating IN ('G', 'PG', 'R')
                  GROUP BY rating);
            """
