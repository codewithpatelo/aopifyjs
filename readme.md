<img src="./logo.png" width="232" align="middle" > 

# Agent-oriented programming in NodeJS.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/30d2b69a8b1f4c2d9de39c6d22fd4651)](https://app.codacy.com/app/patelotech/aopifyjs?utm_source=github.com&utm_medium=referral&utm_content=patelotech/aopifyjs&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/patelotech/aopifyjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/patelotech/aopifyjs?targetFile=package.json)
[![dependencies Status](https://david-dm.org/patelotech/aopifyjs/status.svg)](https://david-dm.org/patelotech/aopifyjs)
[![build](https://travis-ci.org/patelotech/aopifyjs.svg?branch=master)](https://travis-ci.org/patelotech/aopifyjs)
[![Coverage Status](https://coveralls.io/repos/github/patelotech/aopifyjs/badge.svg?branch=master)](https://coveralls.io/github/patelotech/aopifyjs?branch=master)
[![license](https://img.shields.io/badge/license-GNUv3-blue.svg)](https://github.com/patelotech/aopifyjs/blob/master/LICENSE.md) [![Greenkeeper badge](https://badges.greenkeeper.io/patelotech/aopifyjs.svg)](https://greenkeeper.io/)

<img href="https://www.patreon.com/join/patelotech?" src="https://c5.patreon.com/external/logo/become_a_patron_button.png" > 


Multi-agent system in the web. **Still in beta phase.**

## Installation

` npm i aoipifyjs `

```javascript
	
const Agent = require('aopifyjs');

```

## Example Usage

```javascript
const jorgito = new Agent('jorgito');
const juana = new Agent('juana');

jorgito.start();
juana.start();

juana.listen({name: 'greeting'}, jorgito, () => { console.log('JUANA: Hi Jorgito')});
jorgito.tell({name: 'greeting', msg: 'Hi Juana'}, juana);

jorgito.kill();
juana.kill();

```


## Package Dependencies

-   linear-algebra
-   topsis
-   uuid
-   moment

## License

GNU v3

## Contributing

<https://github.com/patelotech/aopifyjs>

## Linting

-   AIRBNB
[AIRBNB JS CODE STYLE](https://dev.mysql.com/doc/ "AIRBNB JS CODE STYLE")

### Configuration

-   Eslint v-5.11.1 // AIRBNB Configuration

### Linting scripts

-   Error check: `npm run lint`
-   Error fix:  `npm run lint` or `npm run lint -- --fix`

## Bibliography

-   Shoham, Y. (1993). Agent-Oriented Programming. Artificial Intelligence. pp. 51–92
-   Shoham, Y. (1992, December). Agent oriented programming: An overview of the framework and summary of recent research. In International Conference on Logic at Work (pp. 123-129). Springer, Berlin, Heidelberg.
-   Rao, A. S. (1996, January). AgentSpeak (L): BDI agents speak out in a logical computable language. In European Workshop on Modelling Autonomous Agents in a Multi-Agent World (pp. 42-55). Springer, Berlin, Heidelberg.
-   Bellifemine, F., Poggi, A., & Rimassa, G. (1999, April). JADE–A FIPA-compliant agent framework. In Proceedings of PAAM (Vol. 99, No. 97-108, p. 33).
-   Bordini, R. H., & Hübner, J. F. (2005, June). BDI agent programming in AgentSpeak using Jason. In International Workshop on Computational Logic in Multi-Agent Systems (pp. 143-164). Springer, Berlin, Heidelberg.
-   Garcia, A. J., & Simari, G. R. (2003). Defeasible logic programming: An argumentative approach. arXiv preprint cs/0302029.
-   Ferretti, E., Errecalde, M., Garcıa, A., & Simari, G. (2006). Khedelp: A framework to support defeasible logic programming for the khepera robots. ISRA06.
-   Hindriks, K. V., De Boer, F. S., Van der Hoek, W., & Meyer, J. J. C. (1999). Agent programming in 3APL. Autonomous Agents and Multi-Agent Systems, 2(4), 357-401.
-   Boissier, O., Bordini, R. H., Hübner, J. F., Ricci, A., & Santi, A. (2013). Multi-agent oriented programming with  JaCaMo. Science of Computer Programming, 78(6), 747–761. doi:10.1016/j.scico.2011.10.004
-   Calenda, T., De Benedetti, M., Messina, F., Pappalardo, G., & Santoro, C. (2016). AgentSimJS: A Web-based Multi-Agent Simulator with 3D Capabilities. In WOA (pp. 117-123).



Copyright (C) 2019 Patricio J. Gerpe
Copyleft (C) 2019 Patricio J. Gerpe
