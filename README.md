godot-elasticsearch
===================

[ElasticSearch](http://www.elasticsearch.org/) producer for [godot](https://github.com/nodejitsu/godot/).

It uses [@jesusabdullah](http://github.com/jesusabdullah)'s [godot-producer](https://github.com/jesusabdullah/godot-producer).

How to use 
-------------

    var godot = require( "godot" );
    var ElasticSearchProducer = require( "godot-elasticsearch" );
    godot.createClient(
        type: "udp",
        producers: [
            new ElasticSearchProducer({
                host: "very.production.app.server.com",
                service: "elasticsearch/health",
                ttl: 10*15,

                esHost: "localhost:9200" // ElasticSearch host

            })
        ]
    ).connect( 1337, "localhost" );

What type of events does `ElasticSearchProducer` emit?
-------------------------

- `elasticsearch/health/healtcheck` (if cluster isnt available this event contains critical state, otherwise it's ok)
- `elasticsearch/health/healtcheck/number_of_nodes`
- `elasticsearch/health/healtcheck/number_of_data_nodes`
- `elasticsearch/health/healtcheck/active_primary_shards`
- `elasticsearch/health/healtcheck/active_shards`
- `elasticsearch/health/healtcheck/relocating_shards`
- `elasticsearch/health/healtcheck/initializing_shards`
- `elasticsearch/health/healtcheck/data.unassigned_shards`

Are you lazy? Don't you wanna roll your on client?
------------------------

This module also installs `godot-elasticsearch` binary.

run `npm install -g godot-elasticsearch && godot-elasticsearch -h localhost:9200 -g udp://localhost:1337` and watch the events \o/

Debugging
------------------------

Run your godot client or godot-elasticsearch command with one of the following DEBUG envs:

- `DEBUG="godot:elasticsearch*"`: shows debug output both of the godot producer and the cli
- `DEBUG="godot:elasticsearch:producer"`: shows debug output of the godot producer
- `DEBUG="godot:elasticsearch:cli"`: show debug output of the cli

LICENSE
----------------------

MIT