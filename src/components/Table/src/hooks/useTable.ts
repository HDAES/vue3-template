/*
 * @Descripttion:
 * @Author: Hades
 * @Date: 2022-01-19 22:57:00
 */

export function useTable(config) {
  function register(instance) {
    console.log(instance)

    return config.api
  }

  return [register]
}
