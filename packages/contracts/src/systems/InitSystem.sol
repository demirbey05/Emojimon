//SPDX-License-Identifer: MIT

pragma solidity ^0.8.0;

import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { MapConfigComponent, ID as MapConfigComponentID, MapConfig } from "components/MapConfigComponent.sol";

uint256 constant ID = uint256(keccak256("system.Init"));

contract InitSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory data) public returns (bytes memory) {
    MapConfigComponent mapConfigComponent = MapConfigComponent(getAddressById(components, MapConfigComponentID));
    if (mapConfigComponent.isSet()) return new bytes(0);

    mapConfigComponent.set(MapConfig({ width: 10, height: 10 }));
  }
}
