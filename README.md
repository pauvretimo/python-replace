# python-replace README

## Features

This extension was made to make more powerful replaces in opened files than with native vscode command with the help of python

### How it works

1. Use a regex to select what you need to change
2. write a one-liner to change all ocurrences inside the file

The arguments of the python function are:
- x: str 
    >The global group of the match (equivalent to match.group())
- y: Match
    >The Match object
- k: int
    >The match count, it starts at 0 and increase by one after each replacement

You can also write as the original vscode syntax $1 for the first group $2 for the second one... instead of y[0], y[1]...

![demo](https://github.com/pauvretimo/python-replace/blob/main/images/demo.gif)

## Requirements

Python needs to be installed on the machine and added to the path.
(I may later make settings so the user can specify the path)

## Extension Settings

W.I.P, Later defined

## Known Issues

not for now, it just was released

## Release Notes

The first one

### 1.0.0

Initial release of python-replace !

