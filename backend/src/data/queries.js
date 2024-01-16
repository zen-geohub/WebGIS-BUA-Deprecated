const getBoundaries = `
SELECT json_build_object(
  'type',       'Feature',
  'geometry',   ST_AsGeoJSON(geom)::json,
  'properties', json_build_object(
    'gid', gid,
    'cityName', name_2,
    'dummy_2021', dummy_2021,
    'dummy_2022', dummy_2022,
    'dummy_2023', dummy_2023
   )
) AS citygeojson
FROM boundary
WHERE gid = $1;`

const getBoundariesName = `
SELECT gid, name_2
FROM boundary;`

const getCoba = `
SELECT json_build_object(
  'type',       'Feature',
  'geometry',   ST_AsGeoJSON(geom)::json,
  'properties', json_build_object(
    'gid', gid
   )
) AS citygeojson
FROM kota_bogor_grid;`

module.exports = {
  getBoundaries,
  getBoundariesName,
  getCoba,
}