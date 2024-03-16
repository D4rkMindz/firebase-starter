<script lang="ts" setup>
import countryData from '~/data/countries.json';
import phoneMasks from '~/data/phone-masks.json';
import BaseInput from '~/components/Form/BaseInput.vue';

const config = {
    country: {
        main: 'CH',
        mostUsed: ['CH', 'DE', 'AT'],
    },
};

const emit = defineEmits(['update:modelValue', 'countrySelected']);
const props = defineProps({
    id: {
        type: String,
        default: 'phonenumber',
    },
    label: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
});

interface PhoneMask {
    code: string;
}

interface Country {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
}

const mostUsedCountries: Country[] = countryData.filter((c) => config.country.mostUsed.includes(c.code));
let preselectedCountry: Country = mostUsedCountries.filter((c) => c.code === config.country.main)[0];
let preselectedCountryIndex = -1;

if (props.modelValue && props.modelValue.toString().startsWith('+')) {
    const code = props.modelValue.toString()?.split(' ')[0];
    const filtered = countryData.filter((c: Country) => c.dial_code === code);
    if (filtered.length > 0) {
        preselectedCountry = filtered[0];
        preselectedCountryIndex = countryData.findIndex((c) => c.dial_code === code);
    }
}

const countries = ref<Country[]>(mostUsedCountries.concat(countryData));
const country = ref<Country>(preselectedCountry);
const selectedIndex = ref<number>(preselectedCountryIndex);
const component = ref<HTMLElement | null>(null);

const phoneNumber = computed(() => {
    let modelValue = props.modelValue?.toString();
    if (modelValue.startsWith('00')) {
        modelValue = modelValue.replace('00', '+');
    }
    if (!modelValue.startsWith('+')) {
        return modelValue;
    }

    const countryCode = modelValue.split(' ')[0];
    const withoutCountryCode = modelValue.replace(countryCode, '').trim();

    if (countryData.filter((c: Country) => c.dial_code == countryCode.trim()).length <= 0) {
        return withoutCountryCode;
    }
    if (!country.value) {
        return withoutCountryCode;
    }

    return applyMask(withoutCountryCode).replace(country.value.dial_code, '').trim();
});

/**
 * Emit an update
 * @param {String} newPhoneNumber - The new phone number
 */
function updatePhoneNumber(newPhoneNumber: string) {
    emit('update:modelValue', applyMask(newPhoneNumber));
}

/**
 * Apply the correct mask to a phone number based on the currently selected country
 * @param {String} unmaskedPhoneNumberWithoutCountryCode - The phone number WITHOUT a country code
 */
function applyMask(unmaskedPhoneNumberWithoutCountryCode: string) {
    const filteredMasks = phoneMasks
        .filter((p: PhoneMask) => p.code.startsWith(country.value.dial_code))
        .sort((a, b) => {
            if (a.code.length > b.code.length) {
                return 1;
            }
            if (a.code.length < b.code.length) {
                return -1;
            }
            return 0;
        });

    const defaultMask = filteredMasks.length > 0 ? filteredMasks[0].code : null;
    if (!defaultMask) {
        return unmaskedPhoneNumberWithoutCountryCode;
    }
    const mask = defaultMask;
    // const ordered = filteredMasks.filter(
    //     (p: PhoneMask) => p.code.length >= unmaskedPhoneNumberWithoutCountryCode.length,
    // );
    // const mask = ordered.shift()?.code || defaultMask;

    let i = 0;
    const val = unmaskedPhoneNumberWithoutCountryCode.replace(/\D/g, '');
    let masked = mask.replace(/(?!\+)./g, (a) => {
        if (/\d/.test(a) || a == ' ') {
            return a;
        }
        if (i < val.length) {
            return val.charAt(i++);
        }
        return '';
    });
    if (i < val.length) {
        masked += val.substring(i, val.length);
    }
    return masked;
}

/**
 * Set the currently selected country
 * @param {Country} c - The selected country
 */
function setCountry(c: Country) {
    country.value = c;
    emit('countrySelected', country.value);
    component.value?.querySelector<HTMLInputElement>('#' + props.id)?.focus();
}

/**
 * Persist the currently selected country
 */
function setSelectedCountry() {
    if (selectedIndex.value > -1 && selectedIndex.value < countries.value.length) {
        setCountry(countries.value[selectedIndex.value]);
    }
}

/**
 * Decrease the current selected country index by one
 */
function decreaseIndex() {
    if (selectedIndex.value > -1) {
        selectedIndex.value = selectedIndex.value - 1;
    }
}

/**
 * Increase the current selected country index by one
 */
function increaseIndex() {
    if (selectedIndex.value < countries.value.length) {
        selectedIndex.value = selectedIndex.value + 1;
    }
}

/**
 * Filter all available countries based on the users input
 * @param {KeyboardEvent} e
 */
function filterCountries(e: KeyboardEvent | any) {
    const search = e.target?.value;
    const isNext = e.key === 'ArrowDown';
    const isPrevious = e.key === 'ArrowUp';
    const isNavigationEvent = isNext || isPrevious || e.key === 'Enter';

    // reset list
    countries.value = mostUsedCountries.concat(countryData);
    if (!search && !isNavigationEvent) {
        selectedIndex.value = -1;
        return;
    }

    if (search) {
        countries.value = countryData;
    }

    // filter accordingly
    countries.value = countries.value.filter(
        (c) =>
            c.code.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            c.dial_code.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
    if (e.key === 'Enter') {
        setSelectedCountry();
        return;
    }
    if (!isNavigationEvent && (selectedIndex.value === -1 || selectedIndex.value > countries.value.length)) {
        selectedIndex.value = 0;
    }
    const list: HTMLElement | Element | null = document.querySelector('[data-countries]') || null;
    if (!list || !(list instanceof HTMLElement)) {
        return;
    }
    const selected = list.querySelector('li.selected');
    if (!selected) {
        return;
    }

    let index = Array.prototype.indexOf.call(selected?.parentNode?.children, selected);
    if (isNext) {
        index += 1;
    } else if (isPrevious) {
        index -= 1;
    }

    const item: HTMLElement | any = selected?.parentNode?.children.item(index);
    if (!item || !(item instanceof HTMLElement)) {
        return;
    }

    if (item.offsetTop + item.offsetHeight >= list.scrollTop + list.offsetHeight) {
        list.scrollTo({ top: item.offsetTop - list.offsetHeight + item.offsetHeight });
    }
    if (item.offsetTop <= list.scrollTop) {
        list.scrollTo({ top: item.offsetTop - list.offsetTop });
    }
}

/**
 * Focus the search box input
 */
function focusCountrySearch() {
    document.getElementById('country-search')?.focus();
}
</script>

<template>
    <div ref="component" class="flex flex-col">
        <label class="w-full text-left label-text" for="phone">
            {{ label || $t('Phone') }}
        </label>

        <div ref="input" class="w-full flex flex-row">
            <div class="dropdown dropdown-top dropdown-start">
                <div
                    class="btn rounded-none rounded-tl rounded-bl"
                    role="button"
                    tabindex="0"
                    @click="focusCountrySearch"
                >
                    {{ country?.dial_code }}
                </div>

                <div class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96" tabindex="0">
                    <div class="flex flex-col max-h-80">
                        <ul class="overflow-y-scroll" data-countries>
                            <li
                                v-for="(c, index) in countries"
                                :key="index"
                                class="w-full"
                                :class="{ selected: index == selectedIndex }"
                                @click="setCountry(c)"
                            >
                                <div class="flex flex-row justify-between">
                                    <span>{{ c.flag }}&nbsp;{{ c.dial_code }}</span>

                                    <span class="text-right">{{ c.name }}</span>
                                </div>
                            </li>
                        </ul>

                        <div class="mt-2 mb-2">
                            <input
                                id="country-search"
                                class="input input-sm w-full"
                                placeholder="Type here"
                                type="text"
                                @keyup="filterCountries"
                                @keyup.up.prevent="decreaseIndex()"
                                @keyup.down.prevent="increaseIndex()"
                                @keyup.enter="setSelectedCountry()"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <BaseInput
                :id="id"
                type="tel"
                class="rounded-none rounded-br rounded-tr"
                :model-value="phoneNumber"
                v-bind="$attrs"
                @update:model-value="(v) => updatePhoneNumber(v)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.selected {
    @apply bg-primary-content border border-primary rounded;
}
</style>
