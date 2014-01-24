"use strict";

var producer = require( "godot-producer" );
var debug = require( "debug" )( "godot:elasticsearch:producer" );
var elasticsearch = require( "elasticsearch" );

var isUndefined = function( value ){
  return typeof value === "undefined";
}

var ElasticSearchProducer = producer(
  function constructor( options ){
    options || ( options = {} );
    debug( "creating client using options: %j", options );
    this.serviceName = options.service;
    this.client = new elasticsearch.Client({
      host: options.esHost
    });
  },
  function produce(){
    var self = this;
    var service = this.values.service;
    debug( "produce" );

    this.client.cluster.health(function( err, data ){
      debug( "cluster response, err: %s, data: %j", err, data );
      if( err ){
        self.emit( "data", {
          service: service + "/healthcheck" ,
          state: "critical",
          description: err.toString()
        });
        return;
      }

      var clusterName = data.cluster_name;
      self.emit( "data", {
        service: service + "/healthcheck",
        description: clusterName,
        meta: data
      });

      if( !isUndefined( data.number_of_nodes ) ){
        self.emit( "data", {
          service: service + "/number_of_nodes",
          description: clusterName,
          metric: data.number_of_nodes
        });
      }

      if( !isUndefined( data.number_of_data_nodes ) ){
        self.emit( "data", {
          service: service + "/number_of_data_nodes",
          description: clusterName,
          metric: data.number_of_data_nodes
        });
      }

      if( !isUndefined( data.active_primary_shards ) ){
        self.emit( "data", {
          service: service + "/active_primary_shards",
          description: clusterName,
          metric: data.active_primary_shards
        });
      }

      if( !isUndefined( data.active_shards ) ){
        self.emit( "data", {
          service: service + "/active_shards",
          description: clusterName,
          metric: data.active_shards
        });
      }

      if( !isUndefined( data.relocating_shards ) ){
        self.emit( "data", {
          service: service + "/relocating_shards",
          description: clusterName,
          metric: data.relocating_shards
        });
      }

      if( !isUndefined( data.initializing_shards ) ){
        self.emit( "data", {
          service: service + "/initializing_shards",
          description: clusterName,
          metric: data.initializing_shards
        });
      }

      if( !isUndefined( data.unassigned_shards ) ){
        self.emit( "data", {
          service: service + "/unassigned_shards",
          description: clusterName,
          metric: data.unassigned_shards
        });
      }
    });
  }
);

module.exports = ElasticSearchProducer;