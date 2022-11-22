board = ["it:is",
         "nowaround",
         "halfquarter",
         "twentytenfive",
         "pastminutesto",
         "beforenoonafter",
         "onetwothreefour",
         "fivesixseventen",
         "eightnineeleven",
         "twelveOsaturday",
         "sundaysmonday",
         "tuesdayfriday",
         "thursdayday",
         "wednesday",
         "night"]
blank = ["_____",
         "_________",
         "___________",
         "_____________",
         "_____________",
         "_______________",
         "_______________",
         "_______________",
         "_______________",
         "_______________",
         "_____________",
         "_____________",
         "___________",
         "_________",
         "_____"]

def timetoboardlit(timestruct):
  """Given a set of words and a board of letters, return the board with the
  necessary letters kept and unneeded ones replaced with _."""
  outboard = ["" for _ in blank]

  s = timestruct[5]
  m = timestruct[4]
  h = timestruct[3]
  d = timestruct[6]

  print("s: " + str(s))
  print("m: " + str(m))
  print("h: " + str(h))
  print("d: " + str(d))

  extra = m % 5  # how many minutes over the 5-minute mark
  near = m - extra  # the nearest 5min increment

  if extra > 2:
    near += 5 # go to the next 5min increment
  if near > 30:
    h += 1 # go to the next hour

  # "It is"
  outboard[0] = "it_is"

  # "Now"/"around"
  if extra == 0:
    outboard[1] = "now______"
  else:
    outboard[1] = "___around"

  # Minute
  if near == 0:
    outboard[2] = blank[2]
    outboard[3] = blank[3]
    outboard[4] = blank[4]
    # Noon (exact only)
    if h == 12 and extra == 0:
      outboard[5] = "______noon_____"
      h = -1 # skip the hour
    else:
      outboard[5] = blank[5]
  elif near == 5:
    outboard[2] = blank[2]
    outboard[3] = "_________five"
    outboard[4] = "____minutes__"
    outboard[5] = "__________after"
  elif near == 10:
    outboard[2] = blank[2]
    outboard[3] = "______ten____"
    outboard[4] = "____minutes__"
    outboard[5] = "__________after"
  elif near == 15:
    outboard[2] = "_a__quarter"
    outboard[3] = blank[3]
    outboard[4] = "past_________"
    outboard[5] = blank[5]
  elif near == 20:
    outboard[2] = blank[2]
    outboard[3] = "twenty_______"
    outboard[4] = "____minutes__"
    outboard[5] = "__________after"
  elif near == 25:
    outboard[2] = blank[2]
    outboard[3] = "twenty___five"
    outboard[4] = "____minutes__"
    outboard[5] = "__________after"
  elif near == 30:
    outboard[2] = "half_______"
    outboard[3] = blank[3]
    outboard[4] = "past_________"
    outboard[5] = blank[5]
  elif near == 35:
    outboard[2] = blank[2]
    outboard[3] = "twenty___five"
    outboard[4] = "____minutes__"
    outboard[5] = "before_________"
  elif near == 40:
    outboard[2] = blank[2]
    outboard[3] = "twenty_______"
    outboard[4] = "____minutes__"
    outboard[5] = "before_________"
  elif near == 45:
    outboard[2] = "_a__quarter"
    outboard[3] = blank[3]
    outboard[4] = "___________to"
    outboard[5] = blank[5]
  elif near == 50:
    outboard[2] = blank[2]
    outboard[3] = "______ten____"
    outboard[4] = "____minutes__"
    outboard[5] = "before_________"
  elif near == 55:
    outboard[2] = blank[2]
    outboard[3] = "_________five"
    outboard[4] = "____minutes__"
    outboard[5] = "before_________"
  else:
    outboard[2] = blank[2]
    outboard[3] = blank[3]
    outboard[4] = blank[4]
    outboard[5] = blank[5]

  # Hour (except twelve/noon)
  if h == 1 or h == 13:
    outboard[6] = "one____________"
    outboard[7] = blank[7]
    outboard[8] = blank[8]
  elif h == 2 or h == 14:
    outboard[6] = "___two_________"
    outboard[7] = blank[7]
    outboard[8] = blank[8]
  elif h == 3 or h == 15:
    outboard[6] = "______three____"
    outboard[7] = blank[7]
    outboard[8] = blank[8]
  elif h == 4 or h == 16:
    outboard[6] = "___________four"
    outboard[7] = blank[7]
    outboard[8] = blank[8]
  elif h == 5 or h == 17:
    outboard[6] = blank[6]
    outboard[7] = "five___________"
    outboard[8] = blank[8]
  elif h == 6 or h == 18:
    outboard[6] = blank[6]
    outboard[7] = "____six________"
    outboard[8] = blank[8]
  elif h == 7 or h == 19:
    outboard[6] = blank[6]
    outboard[7] = "_______seven___"
    outboard[8] = blank[8]
  elif h == 8 or h == 20:
    outboard[6] = blank[6]
    outboard[7] = blank[7]
    outboard[8] = "eight__________"
  elif h == 9 or h == 21:
    outboard[6] = blank[6]
    outboard[7] = blank[7]
    outboard[8] = "_____nine______"
  elif h == 10 or h == 22:
    outboard[6] = blank[6]
    outboard[7] = "____________ten"
    outboard[8] = blank[8]
  elif h == 11 or h == 23:
    outboard[6] = blank[6]
    outboard[7] = blank[7]
    outboard[8] = "_________eleven"
  else:
    outboard[6] = blank[6]
    outboard[7] = blank[7]
    outboard[8] = blank[8]

  # Twelve/Saturday (except noon)
  if h == 0 or h == 12 or h == 24:
    if d == 5:
      outboard[9] = "twelve_saturday"
    else:
      outboard[9] = "twelve_________"
  else:
    if d == 5:
      outboard[9] = "_______saturday"
    else:
      outboard[9] = blank[9]
  
  # Day of the week (except Saturday)
  if d == 0:
    outboard[10] = "_______monday"
    outboard[11] = blank[11]
    outboard[12] = blank[12]
    outboard[13] = blank[13]
  elif d == 1:
    outboard[10] = blank[10]
    outboard[11] = "tuesday______"
    outboard[12] = blank[12]
    outboard[13] = blank[13]
  elif d == 2:
    outboard[10] = blank[10]
    outboard[11] = blank[11]
    outboard[12] = blank[12]
    outboard[13] = "wednesday"
  elif d == 3:
    outboard[10] = blank[10]
    outboard[11] = blank[11]
    outboard[12] = "thursday___"
    outboard[13] = blank[13]
  elif d == 4:
    outboard[10] = blank[10]
    outboard[11] = "_______friday"
    outboard[12] = blank[12]
    outboard[13] = blank[13]
  elif d == 6:
    outboard[10] = "sunday_______"
    outboard[11] = blank[11]
    outboard[12] = blank[12]
    outboard[13] = blank[13]
  else:
    outboard[10] = blank[10]
    outboard[11] = blank[11]
    outboard[12] = blank[12]
    outboard[13] = blank[13]

  # "Night" (pseudo-am/pm)
  if (h >= 0 and h < 6) or h >= 18:
    outboard[14] = "night"
  else:
    outboard[14] = blank[14]

  return outboard
