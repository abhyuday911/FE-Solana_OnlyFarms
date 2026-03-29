export const farmIdl = {
    "address": "2dLysFbhrftGHHpGdsLeDHeCQoqXUAEtQk2qtRt7amCc",
    "metadata": {
        "name": "farm_tokenization",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "RWA Farm-Tokenization built for solana hackthon, hoping to farm some ranking/cash-prize"
    },
    "instructions": [
        {
            "name": "farm_initialize",
            "discriminator": [
                83,
                197,
                201,
                15,
                150,
                57,
                11,
                51
            ],
            "accounts": [
                {
                    "name": "owner",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "farm",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    102,
                                    97,
                                    114,
                                    109
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "owner"
                            },
                            {
                                "kind": "arg",
                                "path": "name"
                            }
                        ]
                    }
                },
                {
                    "name": "farm_token_mint",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    102,
                                    97,
                                    114,
                                    109,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    109,
                                    105,
                                    110,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            }
                        ]
                    }
                },
                {
                    "name": "farm_signer",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    102,
                                    97,
                                    114,
                                    109
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            }
                        ]
                    }
                },
                {
                    "name": "farm_payment_vault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    97,
                                    121,
                                    109,
                                    101,
                                    110,
                                    116,
                                    45,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            }
                        ]
                    }
                },
                {
                    "name": "payment_mint"
                },
                {
                    "name": "farm_revenue_vault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    114,
                                    101,
                                    118,
                                    101,
                                    110,
                                    117,
                                    101,
                                    45,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            }
                        ]
                    }
                },
                {
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "rent",
                    "address": "SysvarRent111111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "total_shares",
                    "type": "u64"
                },
                {
                    "name": "price_per_share",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "share_buying",
            "discriminator": [
                204,
                207,
                170,
                25,
                215,
                18,
                249,
                48
            ],
            "accounts": [
                {
                    "name": "farm",
                    "writable": true
                },
                {
                    "name": "farm_signer"
                },
                {
                    "name": "payer",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "payer_ata",
                    "writable": true
                },
                {
                    "name": "farm_payment_vault",
                    "writable": true
                },
                {
                    "name": "farm_token_mint",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    102,
                                    97,
                                    114,
                                    109,
                                    95,
                                    116,
                                    111,
                                    107,
                                    101,
                                    110,
                                    95,
                                    109,
                                    105,
                                    110,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            }
                        ]
                    }
                },
                {
                    "name": "investor_farm_token_ata",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "payer"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm_token_mint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "user",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "farm"
                            },
                            {
                                "kind": "account",
                                "path": "payer"
                            }
                        ]
                    }
                },
                {
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "pay_amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "Farm",
            "discriminator": [
                161,
                156,
                211,
                253,
                250,
                64,
                53,
                250
            ]
        },
        {
            "name": "UserStake",
            "discriminator": [
                102,
                53,
                163,
                107,
                9,
                138,
                87,
                153
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidShares",
            "msg": "invalid Share Amount"
        },
        {
            "code": 6001,
            "name": "Overflow",
            "msg": "Share Quantity Overflow"
        },
        {
            "code": 6002,
            "name": "ExceedsTotalSupply",
            "msg": "Exceeds Total Supply"
        }
    ],
    "types": [
        {
            "name": "Farm",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "farm_token_mint",
                        "type": "pubkey"
                    },
                    {
                        "name": "payment_mint",
                        "type": "pubkey"
                    },
                    {
                        "name": "farm_payment_vault",
                        "type": "pubkey"
                    },
                    {
                        "name": "farm_revenue_vault",
                        "type": "pubkey"
                    },
                    {
                        "name": "total_shares",
                        "type": "u64"
                    },
                    {
                        "name": "minted_shares",
                        "type": "u64"
                    },
                    {
                        "name": "price_per_share",
                        "type": "u64"
                    },
                    {
                        "name": "account_revenue_per_share",
                        "type": "u128"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "signer_bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UserStake",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "is_initialized",
                        "type": "bool"
                    },
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "farm",
                        "type": "pubkey"
                    },
                    {
                        "name": "quantity",
                        "type": "u32"
                    },
                    {
                        "name": "pay_amount",
                        "type": "u64"
                    },
                    {
                        "name": "debt_claimed",
                        "type": "u128"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        }
    ]
}