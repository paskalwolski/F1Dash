# An F1 Stats Dashboard

A small project I've been undertaking to improve my understanding and skills in React.
The objective of this project is to have a single place to view and analyse the stats and standings of F1 races - both current and historic.

This program currently relies on the (Ergast API)[http://ergast.com/mrd/methods/results/], although this will be deprecated in 2024 - I am considering creating a custom backend for it in the near future.

## Design

The app starts by selecting a View - by default the Race View, which shows all the races in a season.
Each view has it's own context (provided by the useContext hook) and a reducer to manage that context. This allows all components in a specific view to access the same state, but does not go so far as to share state globally.

### Context Providers

Currently, there is only a Race view - however, this could be expanded, allowing the user to view more than just a single race/season at a time. When that happens, it will be necessary to have different contexts for the views - which all come from a single context provider file.
It was a big battle to allow for null state in the context, but also be as confident as possible in a context holding some meaningful state. For now, the Race context can be totally meaningless (on initial creation) but as soon as it starts to be used, it is populated with meaningful values. This does mean that wherever the context is used, it must be null-checked. 

### Reducers

Although there is as yet no root reducer, there is a reducer to handel the state of the Race View. This is made available through the above-mentioned context providers. Through this, a single context can be exposed containing both the get and set methods for that context's state - the dispatch for the reducer is also exposed, and so it can be easily changed from anywhere.


## Component Library

This project uses MUI v5 for its custom components. More information can be found here: https://mui.com
