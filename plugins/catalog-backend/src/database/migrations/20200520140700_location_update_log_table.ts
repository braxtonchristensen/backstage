/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('location_update_log', table => {
    table.uuid('id').primary();
    table.enum('status', ['success', 'fail']).notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.string('message');
    table
      .uuid('location_id')
      .references('id')
      .inTable('locations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('entity_name').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('location_update_log');
}