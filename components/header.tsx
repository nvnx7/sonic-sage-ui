import { Box, Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Sonic Sage
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;