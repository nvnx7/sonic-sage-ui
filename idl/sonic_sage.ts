/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sonic_sage.json`.
 */
export type SonicSage = {
  "address": "7JoThMj3epYFva6TBDQVDGDrn92Uncwj8vB11SJQUUPn",
  "metadata": {
    "name": "sonicSage",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Prediction market program"
  },
  "instructions": [
    {
      "name": "buyOutcome",
      "discriminator": [
        23,
        167,
        228,
        249,
        105,
        241,
        139,
        113
      ],
      "accounts": [
        {
          "name": "market",
          "writable": true
        },
        {
          "name": "subsidyMint",
          "writable": true
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "programTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "outcomeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  117,
                  116,
                  99,
                  111,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "market"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "outcome",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createMarket",
      "discriminator": [
        103,
        226,
        97,
        235,
        200,
        188,
        251,
        254
      ],
      "accounts": [
        {
          "name": "market",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "metadata.market_counter",
                "account": "metadata"
              }
            ]
          }
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "programTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "f64"
        },
        {
          "name": "priceFeedId",
          "type": "string"
        },
        {
          "name": "resolveFrom",
          "type": "u64"
        },
        {
          "name": "resolveTo",
          "type": "u64"
        },
        {
          "name": "subsidyAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemOutcome",
      "discriminator": [
        132,
        231,
        109,
        20,
        197,
        172,
        180,
        32
      ],
      "accounts": [
        {
          "name": "market",
          "writable": true
        },
        {
          "name": "subsidyMint",
          "writable": true
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "programTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "outcomeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  117,
                  116,
                  99,
                  111,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "market"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "resolveMarket",
      "discriminator": [
        155,
        23,
        80,
        173,
        46,
        74,
        23,
        239
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "market",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "sellOutcome",
      "discriminator": [
        78,
        3,
        14,
        78,
        71,
        181,
        114,
        71
      ],
      "accounts": [
        {
          "name": "market",
          "writable": true
        },
        {
          "name": "subsidyMint",
          "writable": true
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "programTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "outcomeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  117,
                  116,
                  99,
                  111,
                  109,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "market"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "outcome",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setupMetadata",
      "discriminator": [
        33,
        141,
        154,
        228,
        169,
        204,
        90,
        181
      ],
      "accounts": [
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              }
            ]
          }
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "market",
      "discriminator": [
        219,
        190,
        213,
        55,
        0,
        227,
        198,
        154
      ]
    },
    {
      "name": "metadata",
      "discriminator": [
        72,
        11,
        121,
        26,
        111,
        181,
        85,
        93
      ]
    },
    {
      "name": "outcomeAccount",
      "discriminator": [
        255,
        113,
        255,
        197,
        114,
        222,
        67,
        166
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidResolveTime"
    },
    {
      "code": 6001,
      "name": "invalidResolveWindow"
    },
    {
      "code": 6002,
      "name": "invalidOutcome"
    },
    {
      "code": 6003,
      "name": "insufficientOutcomeAvailable"
    },
    {
      "code": 6004,
      "name": "marketAlreadyResolved"
    },
    {
      "code": 6005,
      "name": "marketNotResolvedYet"
    },
    {
      "code": 6006,
      "name": "metadataAlreadyInitialized"
    }
  ],
  "types": [
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "f64"
          },
          {
            "name": "priceFeedId",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u64"
          },
          {
            "name": "resolveFrom",
            "type": "u64"
          },
          {
            "name": "resolveTo",
            "type": "u64"
          },
          {
            "name": "subsidyAmount",
            "type": "u64"
          },
          {
            "name": "currentBalance",
            "type": "u64"
          },
          {
            "name": "numOutcome0",
            "type": "u64"
          },
          {
            "name": "numOutcome1",
            "type": "u64"
          },
          {
            "name": "numOutcome0Held",
            "type": "u64"
          },
          {
            "name": "numOutcome1Held",
            "type": "u64"
          },
          {
            "name": "priceOutcome0",
            "type": "f64"
          },
          {
            "name": "priceOutcome1",
            "type": "f64"
          },
          {
            "name": "isResolved",
            "type": "bool"
          },
          {
            "name": "outcome",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "metadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketCounter",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "outcomeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount0",
            "type": "u64"
          },
          {
            "name": "amount1",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
