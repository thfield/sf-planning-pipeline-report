# sf-planning-pipeline-report
slack channel: `#datasci-housingreport`

## About
This is a project of the [Data Science Working Group](https://github.com/sfbrigade/data-science-wg) at Code for San Francisco

These DSWG members are contributors to this project, and how to get in touch with us on slack:

| Name | Slack Handle |
| ---|--- |
| Tyler Field | @tyler |
| Sanat Moningi | @sanat |
| Geoffrey Pay | @gpay |
| Angelique DeCastro | @angeliquedecastro |
| Jeff Quinn | @jfquinn |
| Arash Aghevli | @arashaghevli |

## Working Plan/Next
1. Create a data model that can span several quarters, adjusting for the name mismatch
1. draw data from the Socrata API dynamically
1. come up with detailed UI design
1. questions to explore:
  - how many units are being built per neighborhood per time period?
      - how many of those are affordable?
  - how many projects are being built per neighbood
  - how much space designated as "light industrial" is being gained/lost per neighboorhood?
  - projects approved and filed over time:
      - what happens to the planning process per neighborhood
      - when were projects filed/approved/started/completed?
  - size of project vs speed of getting on market?
  - a way to gauge compliance with Nov 2016's Measure X


## Links
The pipeline [dataset](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-4/ra2x-jzmk)  
The pipeline [website](http://sf-planning.org/pipeline-report)  
[An old report](http://sf-planning.org/sites/default/files/FileCenter/Documents/9338-pipelinereport_q3_2014.pdf)
[an obsolete column mapping google doc](https://docs.google.com/spreadsheets/d/1ikjaHDLf-iCGBCQ1KmSIXVEiVNbX8pQzW26yYqhrH3U/edit#gid=1633784412)

See [data/README.MD](data/README.MD) for details about the data

| dataset | api link |
| ---|--- |
| [2012-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-1/v5p2-emnu) | [2012-Quarter-1 api](https://data.sfgov.org/resource/bi8h-tgxg.json) |
| [2012-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-2/ugxk-ztb8) | [2012-Quarter-2 api](https://data.sfgov.org/resource/g6gj-usjb.json) |
| [2012-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2012-Quarter-4/b2bw-u33d) | [2012-Quarter-4 api](https://data.sfgov.org/resource/fpzh-9ii5.json) |
| [2013-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-1/bime-puj8) | [2013-Quarter-1 api](https://data.sfgov.org/resource/662u-bk2r.json) |
| [2013-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-2/evrp-pcmc) | [2013-Quarter-2 api](https://data.sfgov.org/resource/ixti-hd8i.json) |
| [2013-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-3/hxup-t2n6) | [2013-Quarter-3 api](https://data.sfgov.org/resource/h2ky-3rra.json) |
| [2013-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2013-Quarter-4/ep85-j8df) | [2013-Quarter-4 api](https://data.sfgov.org/resource/s42z-x9np.json) |
| [2014-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-1/g383-7xmf) | [2014-Quarter-1 api](https://data.sfgov.org/resource/fq62-z4pc.json) |
| [2014-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-2/fv2q-qaux) | [2014-Quarter-2 api](https://data.sfgov.org/resource/tkr2-mzci.json) |
| [2014-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-3/n5ik-nmm3) | [2014-Quarter-3 api](https://data.sfgov.org/resource/9xqb-guwy.json) |
| [2014-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2014-Quarter-4/858q-nwrm) | [2014-Quarter-4 api](https://data.sfgov.org/resource/ia2z-a7eh.json) |
| [2015-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-1/2cma-9y6y) | [2015-Quarter-1 api](https://data.sfgov.org/resource/auw5-vpae.json) |
| [2015-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-2/w3e8-bxrm) | [2015-Quarter-2 api](https://data.sfgov.org/resource/b6nb-tyvq.json) |
| [2015-Quarter-3](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-3/apz9-dh7k) | [2015-Quarter-3 api](https://data.sfgov.org/resource/8qip-pyye.json) |
| [2015-Quarter-4](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2015-Quarter-4/ra2x-jzmk) | [2015-Quarter-4 api](https://data.sfgov.org/resource/6jnk-ty34.json) |
| [2016-Quarter-1](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2016-Quarter-1/dtz9-jkjt) | [2016-Quarter-1 api](https://data.sfgov.org/resource/6iid-qfaz.json) |
| [2016-Quarter-2](https://data.sfgov.org/Housing-and-Buildings/San-Francisco-Development-Pipeline-2016-Quarter-2/g5sr-9nhs) | [2016-Quarter-2 api](https://data.sfgov.org/resource/3n2r-nn4r.json) |

## Useful Term Dictionary
Entitlement Status: 0 = Under Planning Review, -1 = Approved By Planning  
APN: Assessor Parcel Number (blocklot, blklot)  
MIPS: Managerial, Information, Professional Services.  (Same as Office?)  
CIE: Cultural, Institutional, Educational  
PDR: Production, Distribution, Repair  
