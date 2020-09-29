(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function(exports, echarts) {
    var log = function(msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('香港', {
        "type": "FeatureCollection",
        "features": [{
                "id": "810001",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@D@bKBoCWKACBGCI@CJSVGFIBKCM@ABAF@LFHPFJJPFNB", "@@ABD@@AAA", "@@AAG@@BBDD@DA"]
                    ],
                    "encodeOffsets": [
                        [
                            [116895, 22829],
                            [116861, 22818],
                            [116860, 22817]
                        ]
                    ]
                },
                "properties": { "cp": [114.1543731, 22.28198083], "name": "中西區", "childNum": 3 }
            }, {
                "id": "810002",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@BMHBBGD@BAHBD@HKDEF@FHDEDECCGCIAAQWCUBSBDXApRE"],
                    "encodeOffsets": [
                        [116927, 22822]
                    ]
                },
                "properties": { "cp": [114.1829153, 22.27638889], "name": "灣仔區", "childNum": 1 }
            }, {
                "id": "810003",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@rWAGBEJKRO@ACCBEAIAEGEACKPA@MDICIDOBKDGAIBIABRJBHDDDCFCFEGE@CFGLC@GAABC@AHGAAN|T"],
                    "encodeOffsets": [
                        [116967, 22827]
                    ]
                },
                "properties": { "cp": [114.2260031, 22.27969306], "name": "東區", "childNum": 1 }
            }, {
                "id": "810004",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@JBJAHBLCPAJCJDPCLOJM@IBAFBBA@CE@AAE@AAFIBQBADAFECCBEA@GFCAYBABIRC@QEGEACBEHMACECQACFE`A@GCK@AFFHADMJBBF@BB@FBHCFI@KLEBCAGWAAQDGCGJQHOPOHS`KLN@LDJAHETUDIJ@HDxCXD", "@@ACCBDB", "@@D@@ACCCB@CC@CFBDHA", "@@BA@AGB@BD@", "@@DABAGCCH@BD@", "@@BAEBD@"]
                    ],
                    "encodeOffsets": [
                        [
                            [116946, 22787],
                            [116886, 22776],
                            [116934, 22767],
                            [117006, 22758],
                            [116932, 22748],
                            [116970, 22738]
                        ]
                    ]
                },
                "properties": { "cp": [114.1600117, 22.24589667], "name": "南區", "childNum": 6 }
            }, {
                "id": "810005",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@AIBINQNIHU]IsRC@AvFBHFDCLDV@"],
                    "encodeOffsets": [
                        [116920, 22860]
                    ]
                },
                "properties": { "cp": [114.1733317, 22.31170389], "name": "油尖旺區", "childNum": 1 }
            }, {
                "id": "810006",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@H[@EEGU@KCCDGEEABQi@AHCF@B^P@BABOFCFBFF@FDNADADHJDhB"],
                    "encodeOffsets": [
                        [116919, 22881]
                    ]
                },
                "properties": { "cp": [114.1632417, 22.33385417], "name": "深水埗區", "childNum": 1 }
            }, {
                "id": "810007",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@DEBEFC@CJKD@DCHDLDBMEG@CFCLICETSDQSJeMGVKHGJIR@HFJBFG^FDD@"],
                    "encodeOffsets": [
                        [116925, 22883]
                    ]
                },
                "properties": { "cp": [114.1928467, 22.31251], "name": "九龍城區", "childNum": 1 }
            }, {
                "id": "810008",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@AC@IH_BAYCEDIAGDICGCCDC@IL@DEDAFCFNDVD@BADBBHCFDJAZD"],
                    "encodeOffsets": [
                        [116970, 22892]
                    ]
                },
                "properties": { "cp": [114.2038856, 22.33632056], "name": "黃大仙區", "childNum": 1 }
            }, {
                "id": "810009",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@F@HWF@DABD@IHBB@GOAENMBE@AEAGOBCFE@CqXCRSTDFKJED@DFHANFCJBFCXD"],
                    "encodeOffsets": [
                        [116974, 22868]
                    ]
                },
                "properties": { "cp": [114.2140542, 22.32083778], "name": "觀塘區", "childNum": 1 }
            }, {
                "id": "810010",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@AEDQ@WQACIKIGCQCABAHC@]I@ADC@ECICCKEGA@NuASIHyO@IEQW@CÙF~bNJFL@D@FLBBNPJJFIDAHEDBDHBDDBBTCB@AHDB^@@JHHF@DDLFJFDBHCD@PPD@L@RLLBDHVBNAHBBABGbB"],
                    "encodeOffsets": [
                        [116914, 22950]
                    ]
                },
                "properties": { "cp": [114.1210792, 22.36830667], "name": "荃灣區", "childNum": 1 }
            }, {
                "id": "810011",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@AC@G]@CABGA@SDAACCGAACFCBGJCIEOIAMKAEHGFgFgPS@E@MEGEEGCAO@E@SLUNCH@DDH@H@JEHAJCHQFAB\\`FBTFTCBCDGBAJLJP\\@FC^CND@AEINGXA@OL@@U@@HN@BEE@@KTA", "@@BAFADAAC@AACDACGEBBHAFGFBDB@", "@@B@BA@AAB", "@@BAB@CCC@BD", "@@D@CGABAF", "@@@ACICABJDD", "@@DA@ACCC@ADBFBB@C", "@@@A@@ABB@"]
                    ],
                    "encodeOffsets": [
                        [
                            [116810, 22924],
                            [116618, 22917],
                            [116612, 22891],
                            [116626, 22888],
                            [116629, 22880],
                            [116725, 22874],
                            [116708, 22866],
                            [116720, 22861]
                        ]
                    ]
                },
                "properties": { "cp": [113.9765742, 22.39384417], "name": "屯門區", "childNum": 8 }
            }, {
                "id": "810012",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@BMDIEK@CDCAMHG@C@MCG@YBAZHZDLIJA[gAGBEHMTO@EAIKAQKK@C@OOC@GDCAIEKECCE@EE@HSB@LF@AFM@@G@@VK@@PWBMHFJ@BMC]DEDY@AAEIEIGEABELSDVHNRJPHJLHXHFBP^ZVBRB@\\CJIDEH@DDAJHDFF@DGL@FFB^CRED@JFDPJHPBHED@HFFF"],
                    "encodeOffsets": [
                        [116828, 23059]
                    ]
                },
                "properties": { "cp": [114.0324381, 22.44142833], "name": "元朗區", "childNum": 1 }
            }, {
                "id": "810013",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@A@@HIEK@EA@BDH@BBBD@BBBAB@MN@DH@@BEFFFFA@C@@VABBDAJ@B@D@FAKEGB@ACACCA@IFCBAAAEFABEHGD@D@AIGB", "@@DC@CEDAFB@", "@@@AAB", "@@@AC@BB", "@@AABB", "@@BAAAEABDDB", "@@@A@CEDDB", "@@@AAB@@", "@@DA@CIE@JDB", "@@@@@@", "@@DCD@BNDBDIAE@I@EE@ABABOHAJBBDBDA", "@@@A@B", "@@B@B@ECAFB@BA", "@@AABB", "@@@@A@@B", "@@A@B@", "@@@A@B", "@@BCAB@B", "@@@A@B", "@@@FBCDBDABBBBBABCB@ABDBBDB@DH@JABBDNEBE@CD@FCKKG@AEC@EBA@ACIEA@EDBB@DB@ABAB", "@@A@BB", "@@D@BCG@ADD@", "@@@@@B", "@@BAA@", "@@A@B@", "@@@@AA@B", "@@QCKMECAKH@FDD@FFDABAFBBHJBPZBDJ@BCD@BBHA@DF@HAAAEEDA@EF@DGF@BC@CGE@GFBLABBADBBDAH@D@@AEIBAFF@ADBDAGGAEA@EIBCLBBA@CDBBCHBBABCTKLFZHRJH@DASMQGGIOEGAGBaNM@eEK@EDKLGBCFEBAAAGGGEEEIIGAEIDU@GBK@IDUAIAEEEGCIEBEAAHM@AABC@EKCWOMEIBKJYCYGAB@ZDH@N@DGHBNCFFNEN@JBFMJBDNDFHFBHEDALDFAFD@KFAFDBFH@FHDBF@DFHAHDLABAFBBDFF@BAAA@@D@DD@@HH@LLDCJFFCJ@BABEFABBJAB@DADDH@BBB@FBDCPBFEJBFC@AFADC@E@E"]
                    ],
                    "encodeOffsets": [
                        [
                            [117049, 23071],
                            [117017, 23092],
                            [117013, 23092],
                            [117010, 23091],
                            [117004, 23090],
                            [117009, 23086],
                            [117081, 23081],
                            [117014, 23081],
                            [117057, 23081],
                            [117015, 23077],
                            [117062, 23071],
                            [117020, 23075],
                            [117024, 23072],
                            [117021, 23072],
                            [117029, 23071],
                            [117037, 23071],
                            [116974, 23071],
                            [116957, 23067],
                            [117036, 23065],
                            [117043, 23049],
                            [117033, 23064],
                            [117035, 23059],
                            [117043, 23052],
                            [117049, 23053],
                            [117040, 23048],
                            [117054, 23039],
                            [116975, 23082]
                        ]
                    ]
                },
                "properties": { "cp": [114.1473639, 22.49610389], "name": "北區", "childNum": 27 }
            }, {
                "id": "810014",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@HGNA@ACGC@G@OFADCL@FDDJDBA@G", "@@@EACUMIMGGGCE@@CACIEMCMISGG@CESIGKGEQGG@CBABALQTCDABC@GCK@EBCACAAKBAHABAB@HA@AE@@ENADBDLFBFABACGEEICG@ICQB@B@J@@GBAAEEAODERKMIGMAAUAAAUA@ACAAA[ASAAHABGAMBUAAA@D@FSPIRBJ\\hNFXPLD@FADPBBGFBFAHPDFHDNBN@JCL@HAR@NCBFJHFJFFHHBHBBFADEHALKFCL@fFN@bMHAHBPFHJTJ", "@@CIEAEJBBBDDDHADBBAAA", "@@@CFABAAGCC@ECCEACB@HAJAB@FEDJJDBHABEAA", "@@BAEB@BB@", "@@^DLCFBBBBJFJNLH@DHN@NXJFFHPHDABABKDAFDDABGAEBCDBFFALDDBFDBDADIBIFOCCICAAAI@CDG@KJ@HEBBDJCBALDBFBBBDB@HBHHALEDE@IEG@EGA@EDIBYEGAIEEICADMFOLA@KEE@OHKHYDAC@KCECAS@CCAEBGGOK@CACIYCEAGEBLCH@JGJ@FBXCHDLBH", "@@AEA@ABB@@FB@", "@@@CAB@B", "@@BAAA@D", "@@BACB@BB@", "@@@A@B", "@@@DHBAEC@", "@@@@", "@@AA@B", "@@BB@CAA@B"]
                    ],
                    "encodeOffsets": [
                        [
                            [117183, 23086],
                            [117087, 23049],
                            [117113, 23039],
                            [117114, 23018],
                            [117122, 23021],
                            [116998, 22974],
                            [117082, 23017],
                            [117084, 23018],
                            [117081, 23013],
                            [117180, 23003],
                            [117039, 23001],
                            [116966, 22997],
                            [117036, 22996],
                            [117006, 22983],
                            [116968, 22976]
                        ]
                    ]
                },
                "properties": { "cp": [114.1717431, 22.44565306], "name": "大埔區", "childNum": 15 }
            }, {
                "id": "810015",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@B@@@C@@BB@", "@@FIJBFCF@JDF@DDBEDBDEHACGDK@EFEFK@EGAI@CDILEBEAIG@C@EECCKBCJEFGFAJGAGDKEGDG@GCCC@CBCFC@AIGAACFEEACC@CEAGB@EC@@AID@KBC@CACCGE@ABALGLBFA@GGEAE@GJAFBFIFCJHN@JOFGFG@@DBHABCFKAAEDCACI@GBGAAFI@GJEBE@ECAEBICCCU@KJI@IGKIBAAHcDEFENAFADE@CDGDET@BCBEJGDKAIKEEEGAACBCF@DA@MHI@CACCAE@AGE@OLEHGBAA@CECCGEAEBITGDANHRGLCDG@QSEG@DEDADHPFB@BEJIJBFHPA@GA@JACCBEBGVE@ABG`@JBDB@ADBFPBPJLLBJRDAJHFFBZDFLN@HPAHBFDDT@DBDF@LBDZCLGPGF@LFB@PKNEBCJDFFBJFHAZCJ@F", "@@A@@@B@", "@@@A@B", "@@@AAB", "@@BAC@@BBB", "@@BAAAABBB", "@@@AAB@@", "@@@AABB@", "@@@@", "@@B@BACEC@@DDD", "@@A@B@", "@@@AABBB", "@@DC@CA@ADA@ADB@", "@@DBFADBLC@MDEBIA@@GJAHGCCBEAA@CCA@CAEKBEBGACBEDEJAFHHAB@LABBDA@@AA@CBBB@DD@@DCDCB@JBBFA", "@@@AAAADB@", "@@@A@B", "@@HE@C@ICAA@AHAHCEEFBFDB", "@@BACA@CC@@DFB", "@@@AA@@@@B", "@@BCFE@ACCDQCACB@FCBCLGHFFBHFDB@DE@AEBBC", "@@@ACAAFD@", "@@BA@@CB@B@@", "@@B@AAABBB", "@@@AA@BB", "@@@ACDBBBA", "@@ACA@BD", "@@BAAB", "@@@@@@", "@@BAAAABBB", "@@A@BB", "@@FADIFEAICAACC@ABG@CD@FCD@BCHFFHB", "@@CEBEBACA@AA@KD@JBHH@BBDA", "@@@@AA@B", "@@@CE@BFD@", "@@AB@FDC@A", "@@DHFEDAFGACBCMBEJ@B", "@@BADABAB@BCKBCDBD", "@@D@C@", "@@A@@BB@", "@@D@C@", "@@BAAB", "@@@@", "@@AA@B", "@@BAAB@@", "@@@AABBB", "@@@@", "@@@@", "@@@@", "@@@@@@", "@@@A@B", "@@@@", "@@AA@D@A", "@@@A@B", "@@@@", "@@@AAB@B", "@@BAEBDB", "@@@@", "@@@@", "@@A@B@", "@@BC@AAAEDDD", "@@B@@AAB", "@@BACKAAC@@JHH", "@@AA@BB@", "@@BCA@AB", "@@@@@A", "@@@@", "@@@A@B", "@@@EAABAE@AAA@@JF@@FBBBAAA", "@@@CCB@BB@", "@@AA@GAAEAAE@@E@AJFLDDFADFB@D@@CAC", "@@AFDBJBAADCDEACFEGA@EEB@FEDAF", "@@JDB@ACDC@AA@ACB@@ADA@EC@@EAEC@E@AECAABBFIBED@B@D@HFDDDFABB"]
                    ],
                    "encodeOffsets": [
                        [
                            [117146, 22985],
                            [117119, 22980],
                            [117154, 22972],
                            [117153, 22970],
                            [117139, 22942],
                            [117137, 22939],
                            [117137, 22938],
                            [117033, 22925],
                            [117063, 22925],
                            [117065, 22924],
                            [117066, 22923],
                            [117031, 22921],
                            [117064, 22919],
                            [117029, 22917],
                            [117054, 22915],
                            [117038, 22915],
                            [117048, 22915],
                            [117075, 22911],
                            [117036, 22912],
                            [117039, 22911],
                            [117043, 22905],
                            [117051, 22909],
                            [117044, 22906],
                            [117050, 22906],
                            [117074, 22902],
                            [117143, 22898],
                            [117036, 22899],
                            [117076, 22898],
                            [117116, 22882],
                            [117120, 22880],
                            [117102, 22876],
                            [117073, 22876],
                            [117119, 22871],
                            [117126, 22873],
                            [117085, 22870],
                            [117121, 22865],
                            [117041, 22863],
                            [117123, 22866],
                            [117118, 22860],
                            [117118, 22859],
                            [117118, 22859],
                            [117069, 22860],
                            [117079, 22857],
                            [117077, 22857],
                            [117116, 22856],
                            [117068, 22845],
                            [117059, 22843],
                            [117058, 22841],
                            [117059, 22841],
                            [117059, 22840],
                            [117059, 22838],
                            [117058, 22838],
                            [117061, 22837],
                            [117066, 22837],
                            [117066, 22837],
                            [117061, 22835],
                            [117070, 22834],
                            [117061, 22834],
                            [117068, 22834],
                            [117068, 22833],
                            [117064, 22810],
                            [117100, 22804],
                            [117100, 22803],
                            [117118, 22799],
                            [117120, 22799],
                            [117028, 22798],
                            [117118, 22797],
                            [117095, 22795],
                            [117103, 22791],
                            [117097, 22787],
                            [117105, 22856],
                            [117111, 22850],
                            [117039, 22789]
                        ]
                    ]
                },
                "properties": { "cp": [114.264645, 22.31421306], "name": "西貢區", "childNum": 73 }
            }, {
                "id": "810016",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@PGJAVDFD@HDBJBPA@OCKDGAYHM@IDGAKBIQCAIKKOIMACEBC_CIBECGDAABC@AUCKCG@ICeAICAAGHAL@FFJCP@FDHADLBFDLJDJRB@XCRBFHBBBDB@BVBBBXBFNHH"],
                    "encodeOffsets": [
                        [116956, 22970]
                    ]
                },
                "properties": { "cp": [114.1953653, 22.37953167], "name": "沙田區", "childNum": 1 }
            }, {
                "id": "810017",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@AECBMBECGA@CDEPEBA]QDGBGj@@cUADF@F@DCFIFSJQTQBaASPEBGzTJvB@MHBLFDDDJ@FCD@@ZJHBBIJBBCCI@GDKEI@EBKHE"],
                    "encodeOffsets": [
                        [116892, 22877]
                    ]
                },
                "properties": { "cp": [114.1393194, 22.36387667], "name": "葵青區", "childNum": 1 }
            }, {
                "id": "810018",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        ["@@AIIGQCQ@GE@G@ICCGAAABCBA@GBGCA@ADOAGO@KBMLC@ACAEFARSDEACSGCEACLIL@DEPCBACEAECCE@AACEIECCKCMGI@KJGJEJ@FDLIBSGUAOOSEAABE@ECG_CSBUPAHGBICEOUMGCKBC@GCGGOC@DDPGDAF@HBFEHAP@JJJH@BNRFDDBHEBICAH@DPHF@DAFFFNLBRFBHNNBD@HEJJVED@DBDZD@DERDFCBAI[@CFGF@~d", "@@DC@AKE@ABADDF@BCFCAAIEG@CBAB@DABAFGDBBPD", "@@BAEAADDB", "@@BCAAIBA@BDBDJB@C", "@@BCCGGCGBABBHFDJ@", "@@J@FC@AAKFGCIC@EDADAD@B@BCBAAEHIBCDDB@DHABB", "@@CEMI@ABEHHFBHBHAFDFBF@BCLBDC@AGIK@OMDKJM@CAAC@YP@AHKAGAACBGHEGC@GBMDCD@HBDFDDDBXCFBNAHEBA@@IEAGCK@CNBDLHHD@BEBDFEBADDDRHBDB@BCF@BA@CCGACLI@EBCFCDFF@DE", "@@@CEA@DFD", "@@FEFBD@DEC@@CCAACGF@AE@CCBAC@CCCCCBBBG@AHH@DHH@DFADABE@CD@BD@DF@BABBDDBH@DBDB@E@AEAFABAKCAA@E", "@@D@ACAACF@BB@", "@@BAC@BB", "@@@@", "@@B@BBBA@EACGAEFA@GDBHJJFA@CB@BCAA@C", "@@D@BCBEAECCGC@BIB@CAAABBDA@@JADDBF@", "@@DE@KG@C@AJBBD@@DDD", "@@BB@AAA@B", "@@BHBB@CCE", "@@BADBDABAD@BAAABAAAABABAA@CA@ADAAAB@DABCACCC@BRDAFC", "@@@A@ACA@DBB", "@@DAAC@@CD@BB@", "@@AB@@", "@@@@", "@@BAA@@B", "@@AAA@@BD@", "@@A@", "@@BBBAAAABCAA@FB", "@@@BD@DDCDBDDBDAB@FCAAE@@EBABEE@CAI@AACAGF@DFDF@BA", "@@@A@A@D", "@@BACA@BBB", "@@B@@ACA@B", "@@DFPFBFF@BCFCFICCDEBIQA@DA@EC@ECCEAE@FJIBABD@@DCAAB@FDH"]
                    ],
                    "encodeOffsets": [
                        [
                            [116799, 22849],
                            [116787, 22826],
                            [116803, 22822],
                            [116823, 22817],
                            [116799, 22797],
                            [116780, 22791],
                            [116882, 22747],
                            [116881, 22757],
                            [116774, 22741],
                            [116575, 22748],
                            [116686, 22746],
                            [116794, 22736],
                            [116733, 22725],
                            [117001, 22721],
                            [117036, 22720],
                            [117038, 22719],
                            [117053, 22714],
                            [116651, 22714],
                            [117053, 22714],
                            [116664, 22710],
                            [116665, 22706],
                            [116665, 22706],
                            [116984, 22706],
                            [116645, 22704],
                            [116647, 22703],
                            [116640, 22702],
                            [116646, 22692],
                            [116656, 22693],
                            [116663, 22685],
                            [116998, 22691],
                            [117001, 22702]
                        ]
                    ]
                },
                "properties": { "cp": [113.94612, 22.28640778], "name": "離島區", "childNum": 31 }
            },
            {
                "id": "820001",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@LADC^umZ@DONWEBDCLHBH@DFBBNA"],
                    "encodeOffsets": [
                        [116285, 22746]
                    ]
                },
                "properties": { "cp": [113.5528956, 22.20787], "name": "花地瑪堂區", "childNum": 1 }
            }, {
                "id": "820002",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@MK@CA@AAGDEB@NVFHE"],
                    "encodeOffsets": [
                        [116281, 22734]
                    ]
                },
                "properties": { "cp": [113.5489608, 22.1992075], "name": "花王堂區", "childNum": 1 }
            }, {
                "id": "820003",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@EGOB@DNLHE@C"],
                    "encodeOffsets": [
                        [116285, 22729]
                    ]
                },
                "properties": { "cp": [113.5501828, 22.19372083], "name": "望德堂區", "childNum": 1 }
            }, {
                "id": "820004",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@YIPEL@JFCBBFADHDBBFDHIJJEFDPCHHlY"],
                    "encodeOffsets": [
                        [116313, 22707]
                    ]
                },
                "properties": { "cp": [113.5536475, 22.18853944], "name": "大堂區", "childNum": 1 }
            }, {
                "id": "820005",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@JICGAECACGEBAAEDP^"],
                    "encodeOffsets": [
                        [116266, 22728]
                    ]
                },
                "properties": { "cp": [113.5419278, 22.18736806], "name": "風順堂區", "childNum": 1 }
            }, {
                "id": "820006",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@ ZNWRquZCBCC@AEA@@ADCDCAACEAGBQ@IN"],
                    "encodeOffsets": [
                        [116265, 22694]
                    ]
                },
                "properties": { "cp": [113.5587044, 22.15375944], "name": "嘉模堂區", "childNum": 1 }
            }, {
                "id": "820007",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@MOIAIEI@@GE@AAUCBdCFIFR@HAFBBDDBDCBCDB@BFDDC"],
                    "encodeOffsets": [
                        [116316, 22676]
                    ]
                },
                "properties": { "cp": [113.5695992, 22.13663], "name": "路氹填海區", "childNum": 1 }
            }, {
                "id": "820008",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": ["@@DKMMa_GC_COD@dVDBBF@@HJ@JFJBNP"],
                    "encodeOffsets": [
                        [116329, 22670]
                    ]
                },
                "properties": { "cp": [113.5599542, 22.12348639], "name": "聖方濟各堂區", "childNum": 1 }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1156", OBJECTID_1: 1250, diss_me: 1156, adm1_cod_1: "TWN-1156", iso_3166_2: "TW-KHH", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Kaohsiung City", name: "高雄市", name_local: null, type: "Zhixiashi", type_en: "Special Municipality", code_local: null, code_hasc: "TW.KH.KC", note: "Established on 2010-12-25 by merging Kaohsiung City (old) with Kaohsiung County", hasc_maybe: null, region: "Special Municipalities", region_cod: null, provnum_ne: 12, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "KH", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 14, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 20070571, woe_label: null, woe_name: "Kaohsiung City", latitude: 23.0157, longitude: 120.609, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 6724652, gn_name: "Kao-hsiung Hsien", gns_id: -2632385, gns_name: "Gaoxiong Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.KHQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW02", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@PiWckQIUH[jYreVuBQ¹[q[][{cGiRiUcw[GqRW@aisQJyX_nmJc]C@@gHaAomhy~yKqi¥p_qs}SÉHMcIqSyDqAk×@sTuDyÓSHK@MEO@¥º¢­KtO^@@KVil|[^KbPbJ^KhUjevcG`BVLZBPCJIFIJEPUdENO¢pZBC^}fOºOFG`J\\TrRp`ThVdjtpnrfztr|º¬Rp@@GnKbBb\\ZtEnF tbflz^bd\\prÐbElObiDM"],
                    encodeOffsets: [
                        [123924, 24e3]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1158", OBJECTID_1: 1251, diss_me: 1158, adm1_cod_1: "TWN-1158", iso_3166_2: "TW-PIF", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Pingtung", name: "屏东县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.PT", note: "Contains the Island Liuch'iu Y?, which should belong to Kaohsiung Shi Special Municipality", hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 11, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "PT", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 8, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347340, woe_label: null, woe_name: "Pingtung County", latitude: 22.5344, longitude: 120.661, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1670479, gn_name: "Pingtung", gns_id: -2635733, gns_name: "Pingdong Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.PIF", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW18", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@BCB@@CLMCC@CSKCAKIWQ@@@@EVJT@@VZP@FD"],
                        ["@@z}ngpbBhG@@\\mFchGlYU£@eOa]eS{Ki_Qo[mWuE©HoPiHs@eVcdgS[iWO[C_V[ZKX_@iDiXkdaadBFƳKuSiYQ_[B{JAicpsf}Z{NCoQQYF[XAPJrkAR@NBX@FXRZDTÙƶMTiraOTnWNIBGFG\\CHaVbcVe^OJCBÔCzSv@tlØBCrTzJrNdÊG~Trt`¦orjzL"]
                    ],
                    encodeOffsets: [
                        [
                            [123261, 22893]
                        ],
                        [
                            [123632, 23437]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1160", OBJECTID_1: 290, diss_me: 1160, adm1_cod_1: "TWN-1160", iso_3166_2: "TW-TNN", wikipedia: null, iso_a2: "TW", adm0_sr: 7, name_en: "Tainan City", name: "台南市", name_local: null, type: "Zhixiashi", type_en: "Special Municipality", code_local: null, code_hasc: "TW.TW.TN", note: "Established on 2010-12-25 by merging Tainan City (old) with Tainan County", hasc_maybe: null, region: "Special Municipalities", region_cod: null, provnum_ne: 6, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TN", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 11, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28751581, woe_label: null, woe_name: "Tainan City", latitude: 23.0464, longitude: 120.182, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1668354, gn_name: "Tainan", gns_id: -2637871, gns_name: "Tainan Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.TNQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW21", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@CIQNM^DJD@HGDMROAE"],
                        ["@@Uq@B^ BAD@KcAI"],
                        ["@@A@\\FB@M_y"],
                        ["@@AQ@@DDAEw"],
                        ["@@M¥L_dY\\@jRhD\\GEQo«¹q{ysqeomisUcSgo_qQ[S_IHE¹PeP]~ADoY@@GlMZ]\\fXTlGfqFIKGYMQY@IPDrER_NQOMSUEUREZFXHPXL\\BXHHVIJR@N~@ERa\\UVF\\TLTFLRG\\IVHVJZRTCPDPZLLTF[PL^hMIxKpTTblZtfdbp`~Z¶TBxO`QP]LcHu"]
                    ],
                    encodeOffsets: [
                        [
                            [122927, 23603]
                        ],
                        [
                            [122929, 23701]
                        ],
                        [
                            [122943, 23747]
                        ],
                        [
                            [122967, 23828]
                        ],
                        [
                            [123431, 23863]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1161", OBJECTID_1: 1252, diss_me: 1161, adm1_cod_1: "TWN-1161", iso_3166_2: "TW-HSZ", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Hsinchu City", name: "新竹市", name_local: null, type: "Shi", type_en: "Provincial City", code_local: null, code_hasc: "TW.TW.HS", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 15, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "HH", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 12, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28751582, woe_label: null, woe_name: "Hsinchu City", latitude: 24.7757, longitude: 120.959, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1675103, gn_name: "Hsinchu", gns_id: -2631089, gns_name: "Xinzhu Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.HSQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW08", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@AAcGaLU\\_RuR@@J^jRTFLALCLGPJVNL@@W¶ajS^[PYGYQIiEkO[_QgQS"],
                    encodeOffsets: [
                        [123864, 25309]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1162", OBJECTID_1: 1253, diss_me: 1162, adm1_cod_1: "TWN-1162", iso_3166_2: "TW-HSQ", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Hsinchu", name: "新竹县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.HH", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 14, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "HH", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 7, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347334, woe_label: null, woe_name: "Hsinchu County", latitude: 24.6748, longitude: 121.163, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1675107, gn_name: "Hsinchu", gns_id: -2631085, gns_name: "Xinzhu Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.HSZ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW09", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@ªHdU`}fMbG`MtO\\]GiZYtM`UXU^C^B\\YT_bMZSBaLsMucmD_h[pYlE`Sx]fOQmKaF]]i­£_UFGECCbcxYXI^e\\¡UeDsC{M_FFdJbG\\ETFVHXB\\Ef]Xho`]`aRTRh\\`lPjFRJHZOZ]\\iTµbX@BLPFZFTPVTNTFAJFTRjPX@@XG"],
                    encodeOffsets: [
                        [123888, 25547]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1163", OBJECTID_1: 1254, diss_me: 1163, adm1_cod_1: "TWN-1163", iso_3166_2: "TW-ILA", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Yilan", name: "宜兰县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.IL", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 10, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "IL", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 5, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347336, woe_label: null, woe_name: "Yilan County", latitude: 24.5913, longitude: 121.644, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1674197, gn_name: "Yilan", gns_id: -2631998, gns_name: "Yilan Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.ILA", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW26", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@B@PAFKFCEO]@IFCD@@INHATJ@BB@@@"],
                        ["@@@KYBWASEMITcJmEgmWCQFSLSFSSOoYwwAWDoGSIOGUCmCKGGCIHKBAG@LÏ]EQig_q@Vµ\\qVSNmbe@cO]C]RaReHKZFf[H`®¤^jE^LbRnDL^JZCZHR\\Wh\\XFnLfL^XfXtV^TCNGX@\\Ndf\\^P¦f¨xpNhZXdX\\^N\\HbVNZSZLTP\\R^nJZMFG@@ikaÑßUaQoKuCuBsZ­A[K[ByZkt[|I"]
                    ],
                    encodeOffsets: [
                        [
                            [124869, 25450]
                        ],
                        [
                            [124808, 25195]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1164", OBJECTID_1: 1255, diss_me: 1164, adm1_cod_1: "TWN-1164", iso_3166_2: "TW-KEE", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Keelung City", name: "基隆市", name_local: null, type: "Shi", type_en: "Provincial City", code_local: null, code_hasc: "TW.TW.CL", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 18, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "CL", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 12, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 22695855, woe_label: null, woe_name: "Keelung City", latitude: 25.1131, longitude: 121.704, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 6724654, gn_name: "Keelung", gns_id: 10126902, gns_name: "Jilong Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.KEE", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW12", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@ABS\\[CQQK_IgD^WP[XUXMZUZCTXPxVbT@@LEFGLK^IQ"],
                    encodeOffsets: [
                        [124684, 25747]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1165", OBJECTID_1: 1256, diss_me: 1165, adm1_cod_1: "TWN-1165", iso_3166_2: "TW-MIA", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Miaoli", name: "苗栗县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.ML", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 19, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "ML", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347338, woe_label: null, woe_name: "Miaoli County", latitude: 24.5253, longitude: 120.942, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1671968, gn_name: "Miaoli", gns_id: -2634238, gns_name: "Miaoli Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.MIA", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW15", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@dHBBb^_p_g^WFeA[GWEUFSH[IaEc`E|NtDfC¢Vf[J]ZWdwDa[QMgeMi@_Sc_mUuSakPefmRFiWGsgSCnqHyZ³qfcd¤@@xzN\\HpPfnNnLRtNNPJRJR`^dXlJxGGfVZ\\ZPjFL\\NBH@@vQ`QV[bK"],
                    encodeOffsets: [
                        [123845, 25304]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1166", OBJECTID_1: 1257, diss_me: 1166, adm1_cod_1: "TWN-1166", iso_3166_2: "TW-TPE", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Taipei City", name: "台北市", name_local: null, type: "Zhixiashi", type_en: "Special Municipality", code_local: null, code_hasc: "TW.TP.TC", note: "Incorrectly labeled as Taipei County in previous versions", hasc_maybe: null, region: "Special Municipalities", region_cod: null, provnum_ne: 5, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TW", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 11, mapcolor9: 7, mapcolor13: 2, fips: "TW03", fips_alt: "TW04", woe_id: 20070568, woe_label: null, woe_name: "Taipei City", latitude: 25.0904, longitude: 121.559, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1668338, gn_name: "T'ai-pei Shih", gns_id: -2637885, gns_name: "Taibei Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.TPE", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW03", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@mBeF[X]^k`_pNtIlmh[^LTNRP`\\\\nVP`N\\GROEWDYLUNYR^WN_MmBcdQ\\WM]{_M"],
                    encodeOffsets: [
                        [124522, 25570]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1167", OBJECTID_1: 1258, diss_me: 1167, adm1_cod_1: "TWN-1167", iso_3166_2: "TW-TPQ", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "New Taipei City", name: "新北市", name_local: null, type: "Zhixiashi", type_en: "Special Municipality", code_local: null, code_hasc: "TW.TW.TP", note: "Incorrectly labeled as Taipei City in previous versions; established on 2010-12-25 by upgrading from Taipei County", hasc_maybe: null, region: "Special Municipalities", region_cod: null, provnum_ne: 9, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TP", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 15, mapcolor9: 7, mapcolor13: 2, fips: "TW03", fips_alt: null, woe_id: 20070569, woe_label: null, woe_name: "Taipei County", latitude: 24.911, longitude: 121.646, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1665148, gn_name: "Taipei", gns_id: -2641168, gns_name: "Xinbei Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.TPQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW23", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@\\uHDVFXBPC@EGIGK@OHGRK@@aSwUWODSVYNYVW\\WXO]hC`JRLDR[\\ATBŎ{XMKYCUFcT}T[PEvF\\AbG\\MPQ]@@EHYNmI][QOKSTYMYaU[G]MW[WcgYoM§w¥e]Oe[Mc@[HWDM]SsUeW]WeKmKQf|IhGdZZJfgNyCgTJpGdgdIdJjAj\\^¦ZZZH\\C^gtaP]FYTcVqV_`@@NdNpdNFRDX@\\GNSJQLKZJ[hkjWNFRNLPFFFPdXjtjbRIdW¡", "@@MQKS\\]ngJkMs`ol_^]\\WfEnA`N|N^[XcRAdNnM`]XQMZKVCZFXQP[H_MUOm[[O_"],
                        ["@@OIATRI"]
                    ],
                    encodeOffsets: [
                        [
                            [124556, 25829],
                            [124391, 25743]
                        ],
                        [
                            [125010, 26246]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1168", OBJECTID_1: 1259, diss_me: 1168, adm1_cod_1: "TWN-1168", iso_3166_2: "TW-TAO", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Taoyuan", name: "桃园市", name_local: null, type: "Shi", type_en: "City", code_local: null, code_hasc: "TW.TW.TY", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 16, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TY", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 7, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347345, woe_label: null, woe_name: "Taoyuan County", latitude: 24.961, longitude: 121.227, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1667900, gn_name: "Taoyuan", gns_id: -2638324, gns_name: "Taoyuan Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.TAO", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW25", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@zDhMIeYYHcJg{ReWEg[XQ[YGYD]ICKePw^_TkFoZg\\C`dnNvKtAbYTaNS`[Z]A]DWV_VsNYZHj[^sP_NaHeN_~cV©GWH¤vzxlÐjbT\\VdRVÜZ`_rUdUZS^EbOhsD]G[YY¥Y[]BiIiJchcHcIohS"],
                    encodeOffsets: [
                        [124283, 25442]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1169", OBJECTID_1: 1260, diss_me: 1169, adm1_cod_1: "TWN-1169", iso_3166_2: "TW-CHA", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Changhua", name: "彰化县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.CG", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 20, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "CG", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 8, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 20070572, woe_label: null, woe_name: "Changhua County", latitude: 24.0016, longitude: 120.464, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1679134, gn_name: "Changhua", gns_id: -2627040, gns_name: "Zhanghua Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.CHA", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW05", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@@YaIIUF[O_Me@iImEPk\\W^IlSGY]IQOSKGCPm@jÙP`sLyDëS{`@@FJNrHVxpPTTx`vn´T`XVTLPHLJFVHRh^JVDHTTR nM`YTkHubeYbYXaP[@]JW`ClY@I"],
                    encodeOffsets: [
                        [123564, 24597]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1170", OBJECTID_1: 292, diss_me: 1170, adm1_cod_1: "TWN-1170", iso_3166_2: "TW-CYQ", wikipedia: null, iso_a2: "TW", adm0_sr: 7, name_en: "Chiayi", name: "嘉义县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.CH", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 22, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "CH", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 7153409, woe_label: null, woe_name: "Chiayi County", latitude: 23.4465, longitude: 120.26, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1678835, gn_name: "Chiayi", gns_id: -2627340, gns_name: "Jiayi Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.CYQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW07", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@MICHRVHRHJFC@GKMIU"],
                        ["@@EG@NPZHDCMMU"],
                        ["@@@@@^DA@SCG"],
                        ["@@CKAB@ACPHC@@B@"],
                        ["@@CIGLADLC@AB@"],
                        ["@@YK^h¬¤¢RD§a_WY[YWOaY"],
                        ["@@¤_\\DPfWR[rFP`J@XBdD@pEtQ`GhSAeWeJaTmDiHY|IĆAHAÏq[oacy]kaesmEsF[YAaLaHm@@F[HgCiQ[@cZK`N¦GvKdO^_RwPAµS}Yo_casekYSaoSwLJgN^BZJJCEXQKMDS@@XTh\\Bj@[_zNZ@NWJDLNPFR`fCA~F@BBHap@^VNdPTjFvjbP^\\ÀvN¤RtBjafi", "@@]]FgpOvazItRdDXPSrS\\_PiN}CK"]
                    ],
                    encodeOffsets: [
                        [
                            [122989, 23871]
                        ],
                        [
                            [122997, 23916]
                        ],
                        [
                            [123016, 23949]
                        ],
                        [
                            [123022, 23983]
                        ],
                        [
                            [123017, 24005]
                        ],
                        [
                            [122901, 24001]
                        ],
                        [
                            [123426, 24170],
                            [123278, 24074]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1171", OBJECTID_1: 1261, diss_me: 1171, adm1_cod_1: "TWN-1171", iso_3166_2: "TW-CYI", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Chiayi City", name: "嘉义市", name_local: null, type: "Shi", type_en: "Provincial City", code_local: null, code_hasc: "TW.TW.CS", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 3, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "CH", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 11, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28751583, woe_label: null, woe_name: "Chiayi City", latitude: 23.4822, longitude: 120.441, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1678834, gn_name: "Chiayi", gns_id: -2627341, gns_name: "Jiayi Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.CYI", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW06", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@yJuboPEh^^L~DjM`OT[TqWOcCsQ"],
                    encodeOffsets: [
                        [123346, 24009]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1172", OBJECTID_1: 1262, diss_me: 1172, adm1_cod_1: "TWN-1172", iso_3166_2: "TW-HUA", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Hualien", name: "花莲县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.HL", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 13, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "HL", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 7, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347335, woe_label: null, woe_name: "Hualien County", latitude: 23.7743, longitude: 121.381, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1674502, gn_name: "Hualien", gns_id: -2631692, gns_name: "Hualian Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.HUA", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW10", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@h`Rj^FÐKH@@@FEFIFIBGKOkiq{cYIMDOEIscSQUiUyI_@aNcLOJGHI@UGY]gEYAmY³o·ŝcȉ@@[He]eNqDo[qYeUmQ{]wcYkBoGkq[J²kLqFgbmT}VezItARUvqfiZG\\JVlRXdOjpXXTMlLTL\\h\\zLzBhbL|^d|TbXLdZJ|GrIhW\\O\\lBZTr^|X~LDvM`OXRvh~BZKbgXUTA\\TtPjRAXKn@@VNJNZLX\\JdXbzbRlD^dbTMrU¶[Ur@"],
                    encodeOffsets: [
                        [124523, 24915]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1173", OBJECTID_1: 1263, diss_me: 1173, adm1_cod_1: "TWN-1173", iso_3166_2: "TW-NAN", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Nantou", name: "南投县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.NT", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 17, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "NT", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347339, woe_label: null, woe_name: "Nantou County", latitude: 23.7977, longitude: 120.988, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1671564, gn_name: "Nantou", gns_id: -2634645, gns_name: "Nantou Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.NAN", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW16", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@LmBWiQsO[SBVShWLaAY}gQuPWN_CuKW}]{SqAYkP[X[JgHqI{YKcaW{S]cK{gayAyKg[K[KSNkWSoWCNajkPaFGBąB{JGZCjSnIbXfBfgT_HsRoFSXEuMkR_bHhNdGxHrPbOtTLRP^JHZkT]J[XOlF Jn@jNfP`E\\JVbJ@Z`@ÌQbDfbz¦^|rVIpBlvXNoZFThf\\rAhN~vfTdFbpBpF`dBdG¨G"],
                    encodeOffsets: [
                        [124256, 24818]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1174", OBJECTID_1: 1264, diss_me: 1174, adm1_cod_1: "TWN-1174", iso_3166_2: "TW-TXG", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Taichung City", name: "台中市", name_local: null, type: "Zhixiashi", type_en: "Special Municipality", code_local: null, code_hasc: "TW.TW.TG", note: "Established on 2010-12-25 by merging Taichung City (old) with Taichung County", hasc_maybe: null, region: "Special Municipalities", region_cod: null, provnum_ne: 23, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TH", area_sqkm: 0, sameascity: 1, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 13, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28751584, woe_label: null, woe_name: "Taichung City", latitude: 24.238, longitude: 120.966, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1668392, gn_name: "Taichung", gns_id: -2637831, gns_name: "Taizhong Shi", gn_level: 2, gn_region: null, gn_a1_code: "TW.TXQ", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW19", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@DhTHtjXEnQfelObvTnVd``Tj@fNNh\\RFDHVE\\GEeLYfGbQ^Q^DdPf@nacaC]QkyaWaIcW[YKIMUM@@§HcHcA_oEoAacEeS}ugMqBe[SgYEpWMkuoAJqU]{y¥eaaCËR_@@JkZ_DIX@^O\\WbaZZafGvSl_ZmN@@FDFXZTPlV²VZf¨¨£dcre´zYrGm"],
                    encodeOffsets: [
                        [123754, 24876]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1176", OBJECTID_1: 1265, diss_me: 1176, adm1_cod_1: "TWN-1176", iso_3166_2: "TW-YUN", wikipedia: null, iso_a2: "TW", adm0_sr: 1, name_en: "Yunlin", name: "云林县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.YL", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 21, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "YL", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347346, woe_label: null, woe_name: "Yunlin County", latitude: 23.7253, longitude: 120.427, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1665194, gn_name: "Yunlin", gns_id: -2641046, gns_name: "Yunlin Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.YUN", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW27", gns_region: null },
                geometry: {
                    type: "Polygon",
                    coordinates: ["@@ìTzCtK_ÚOin@OHDPsOaGqHwMcGg`alQvNFTWC@Ac@W_IOqEQ\\eXO[C£`ejibsA£QuM¿][aOuiiEOSMc]Uo@bGAAE@ddA¶FTbvJR~JVpzHTFJl^FL@@|_"],
                    encodeOffsets: [
                        [123160, 24395]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-1177", OBJECTID_1: 1233, diss_me: 1177, adm1_cod_1: "TWN-1177", iso_3166_2: "TW-TTT", wikipedia: null, iso_a2: "TW", adm0_sr: 4, name_en: "Taitung", name: "台东县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.TT", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 2, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TT", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 7, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 2347344, woe_label: null, woe_name: "Taitung County", latitude: 22.0499, longitude: 121.54, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1668292, gn_name: "Taitung", gns_id: -2637931, gns_name: "Taidong Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.TTT", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW24", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@EIIHFJJG"],
                        ["@@iMyVsb]\\HR@TGPMPÚ@@MCGGOAUHQdYPOCS"],
                        ["@@@GEBM@GBADUHUbI^DFDJCDME[EKCKDK"],
                        ["@@OOcWQOGOKie{UQi©IS«Y[ASDkASGWQWcke_»UIOSgScWiOc¹·IgK³B©cAbcbWlCj@jW`YLU\\D`P\\jXT\\chUd@fGtOjGpFªXv\\nRpj`|LfT^Pb@fV¤kZgHEd[n^DIdmnW`IzRtbj@XQHrx\\VdQjHj|d^\\r\\º\\Jsfy~UnSharElK±Ir\\HlApZld^xR|VnZf\\rCpMr^ff\\GcûQcuUcOkI@Ge"]
                    ],
                    encodeOffsets: [
                        [
                            [124525, 22481]
                        ],
                        [
                            [124506, 22543]
                        ],
                        [
                            [124413, 23182]
                        ],
                        [
                            [124295, 23666]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-3414", OBJECTID_1: 291, diss_me: 3414, adm1_cod_1: "TWN-3414", iso_3166_2: "TW-PEN", wikipedia: null, iso_a2: "TW", adm0_sr: 7, name_en: "Penghu", name: "澎湖县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.TW.PH", note: null, hasc_maybe: null, region: "Taiwan Province", region_cod: null, provnum_ne: 0, gadm_level: 0, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "PH", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 22695856, woe_label: null, woe_name: "Penghu County", latitude: 23.5724, longitude: 119.597, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1670651, gn_name: "Penghu", gns_id: -2635561, gns_name: "Penghu Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.PEN", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW17", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@MEIJKbHH\\JVEBMAKIGKO"],
                        ["@@KUQDORARJHXCNU"],
                        ["@@A@@@A@@BGHDBADN@BBDADCACDEG@@AG@"],
                        ["@@A@@FBC@A"],
                        ["@@BAR@CGD@GKEK@@@@CJEJBLB@@B"],
                        ["@@@EB@@CCBC@@BA@D@DF"],
                        ["@@MEHNFG"],
                        ["@@A@A@@@ADBBDA@C"],
                        ["@@AAABADD@@@BC"],
                        ["@@@GC@ALFC"],
                        ["@@EAE@WKABBJHLFDLBLGAG"],
                        ["@@BQDIFCFEEIGG@GDEKCWBKDJVA^ECOCCPPdLDV[D@DC"],
                        ["@@FABBJCACBGCEOCCD@@EDHPB@BB"],
                        ["@@SKCAAAC@KCQGAB@@EBCLBB@@@@DBNABBHBDB@@RHRC@@B@"],
                        ["@@EI`HXARBLRd{J]CUMPSLUD_OUCICEKG[EGcSeEeNebJRVU^EbH\\TSHMHKLKNCE@AAAGCA^B\\N@PCzbdJG]"],
                        ["@@[@DPJHNDTBPFFN@bZXV`YQIMYU{@ODMAIWCO@KAICIG"],
                        ["@@QCGJEZOTa^l^XKZSJUQOFYIO"],
                        ["@@AGAD@@GRBDCFNJHPDFDC@CTICKOIOO"]
                    ],
                    encodeOffsets: [
                        [
                            [122292, 23752]
                        ],
                        [
                            [122287, 23795]
                        ],
                        [
                            [122477, 23806]
                        ],
                        [
                            [122482, 23815]
                        ],
                        [
                            [122532, 23823]
                        ],
                        [
                            [122524, 23825]
                        ],
                        [
                            [122373, 23830]
                        ],
                        [
                            [122194, 23877]
                        ],
                        [
                            [122179, 23883]
                        ],
                        [
                            [122194, 23884]
                        ],
                        [
                            [122401, 23929]
                        ],
                        [
                            [122368, 23953]
                        ],
                        [
                            [122176, 23973]
                        ],
                        [
                            [122404, 24062]
                        ],
                        [
                            [122480, 24162]
                        ],
                        [
                            [122324, 24128]
                        ],
                        [
                            [122456, 24192]
                        ],
                        [
                            [122466, 24301]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-3415", OBJECTID_1: 3446, diss_me: 3415, adm1_cod_1: "TWN-3415", iso_3166_2: "TW-", wikipedia: null, iso_a2: "TW", adm0_sr: 4, name_en: "Kinmen", name: "金门县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.FK.KM", note: null, hasc_maybe: null, region: "Fujian Province", region_cod: null, provnum_ne: 0, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "CM", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 6, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28760735, woe_label: null, woe_name: "Kinmen", latitude: 24.454, longitude: 118.368, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 1676511, gn_name: "Kinmen", gns_id: -2629674, gns_name: "Jinmen Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.1676511", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW13", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@gIUHfJJPDR@NINKAUIOK@IGCGIE"],
                        ["@@dG}]_s^gLEu__kYK]NSBSFGPBDRTFJ@N@RE^M^ANLF|\\ovFH~RhzJxm"],
                        ["@@UIKHFVRJNABKEO"]
                    ],
                    encodeOffsets: [
                        [
                            [121078, 24999]
                        ],
                        [
                            [121293, 25094]
                        ],
                        [
                            [122342, 25581]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { adm1_code: "TWN-5128", OBJECTID_1: 6631, diss_me: 5128, adm1_cod_1: "TWN-5128", iso_3166_2: "TW-", wikipedia: "http://en.wikipedia.org/wiki/Matsu_Islands", iso_a2: "TW", adm0_sr: 1, name_en: "Lienchiang", name: "连江县", name_local: null, type: "Hsien", type_en: "County", code_local: null, code_hasc: "TW.FK.LK", note: null, hasc_maybe: null, region: "Fujian Province", region_cod: null, provnum_ne: 16, gadm_level: 2, check_me: 20, scalerank: 9, datarank: 8, abbrev: null, postal: "TY", area_sqkm: 0, sameascity: -99, labelrank: 9, featurecla: "Admin-1 scale rank", name_len: 10, mapcolor9: 7, mapcolor13: 2, fips: null, fips_alt: null, woe_id: 28760734, woe_label: null, woe_name: "Lienchiang", latitude: 26.1519, longitude: 119.938, sov_a3: "TWN", adm0_a3: "TWN", adm0_label: 2, admin: "Taiwan", geonunit: "Taiwan", gu_a3: "TWN", gn_id: 6724655, gn_name: "Lienchiang", gns_id: 10126903, gns_name: "Lianjiang Xian", gn_level: 2, gn_region: null, gn_a1_code: "TW.6724655", region_sub: null, sub_code: null, gns_level: 1, gns_lang: "zho", gns_adm1: "TW14", gns_region: null },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@@OOMMEQGTfRABFHB"],
                        ["@@OMQX\\HVIOG"],
                        ["@@HCbRV@@KUUiSMASLEPDTHNH@@GBERE"],
                        ["@@AGAGDGAEIHIPIDQGGBIAIKIcGFCJD^DLHDTFFFPJTAJMHCDE"],
                        ["@@GAC@CBEAEEGOADIBEBGDHLCJHDPNVKDGHG"]
                    ],
                    encodeOffsets: [
                        [
                            [122870, 26593]
                        ],
                        [
                            [122824, 26596]
                        ],
                        [
                            [122812, 26788]
                        ],
                        [
                            [122895, 26850]
                        ],
                        [
                            [123400, 27009]
                        ]
                    ]
                }
            }, {
                type: "Feature",
                properties: { name: "中国属钓鱼岛" },
                geometry: {
                    type: "MultiPolygon",
                    coordinates: [
                        ["@@DFDDFBB@FEDCBCAEIAGBEFAB"],
                        ["@@AJFJJHTFJAFAJ@NKAEICI@M@IEMCKAAD"],
                        ["@@HFB@@ADGDAAC@AGA@DEHA@@B"],
                        ["@@DBHBHAHE@ACAC@KDI@BD"],
                        ["@@F@BAG@@B"],
                        ["@@@@D@B@BD@BDCGCC@@B"],
                        ["@@@@B@@@@@BB@A@@@AA@@@AB"]
                    ],
                    encodeOffsets: [
                        [
                            [126644, 26546]
                        ],
                        [
                            [126422, 26354]
                        ],
                        [
                            [126503, 26350]
                        ],
                        [
                            [126509, 26342]
                        ],
                        [
                            [126469, 26354]
                        ],
                        [
                            [126505, 26399]
                        ],
                        [
                            [126532, 26374]
                        ]
                    ]
                }
            }
        ],
        "UTF8Encoding": true
    });
}));