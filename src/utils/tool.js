export function generateBreadcumb (menuList, url) {
  if (!Array.isArray(menuList)) {
    throw new Error('argument must be an array')
  }
  if (!url) {
    throw new Error('arguments error')
  }
  let breadcrumb = []
  for (let i = 0; i < menuList.length; i++) {
    var current = menuList[i]
    if (current.type === 1) {
      if (url.includes(current.url)) {
        breadcrumb[0] = {
          title: current.name,
          url: current.url
        }
        break
      }
    } else {
      for (let j = 0; j < current.childMenus.length; j++) {
        var child = current.childMenus[j]
        if (url.split('/').slice(0, 3).join('/') === child.url) {
          breadcrumb[0] = {
            title: current.name,
            url: child.url.split('/').slice(0, -1).join('/')
          }
          breadcrumb[1] = {
            title: child.name,
            url: child.url
          }
          break
        }
      }
    }
  }
  return breadcrumb
}

export function myAddressCity (value, cityInfo, type = 1) {
  for (let y in cityInfo) {
    if (type) {
      if (cityInfo[y].value === value) {
        return cityInfo[y].label
      }
    } else {
      if (cityInfo[y].label === value) {
        return cityInfo[y].value
      }
    }
  }
}

export function myAddressErae (value, cityInfo, type = 1) {
  for (let y in cityInfo) {
    for (let z in cityInfo[y].children) {
      if (type) {
        if (cityInfo[y].children[z].value === value && value !== undefined) {
          return cityInfo[y].children[z].label
        }
      } else {
        if (cityInfo[y].children[z].label === value && value !== undefined) {
          return cityInfo[y].children[z].value
        }
      }
    }
  }
}

export function myAddressMinerae (value, cityInfo, type = 1) {
  for (let y in cityInfo) {
    for (let z in cityInfo[y].children) {
      for (let i in cityInfo[y].children[z].children) {
        if (type) {
          if (cityInfo[y].children[z].children[i].value === value && value !== undefined) {
            return cityInfo[y].children[z].children[i].label
          }
        } else {
          if (cityInfo[y].children[z].children[i].label === value && value !== undefined) {
            return cityInfo[y].children[z].children[i].value
          }
        }
      }
    }
  }
}

// export function flat (arr, childrenName) {
//   for (var i = 0; i < arr.length; i++) {
//     const item = arr[i]
//     if (item[childrenName]) {
//       this.flat(item[childrenName], childrenName)
//     }
//     this.result.push(item)
//   }
// }
